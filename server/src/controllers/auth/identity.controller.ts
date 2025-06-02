import { Request, RequestHandler, Response } from 'express';
import AuthModel from '@/models/auth';
import { TokenPayload } from '@/utils/auth';
import { UserModel } from '@/models/user';
import { AuthenticatedRequest } from '@/middleware/auth';

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400).json({ error: 'Missing credentials' });
      return;
    }
    
    const user = await UserModel.findByPhone(phone);
    
    if (!user || !UserModel.verifyPassword(user, password)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const roles = await UserModel.getUserRoles(user.userID);

    const payload: TokenPayload = { userId: user?.userID, roles };
    const { accessToken, refreshToken } = AuthModel.generateTokenPair(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(200).json({ accessToken, user: { fullName: user.firstName, roles }, id: user.userID});
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const refreshToken: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {refreshToken} = req.cookies;

    if (!refreshToken){
      res.status(400).json({ error: 'Missing refresh token' });
      return;
    }

    const accessToken = AuthModel.refreshAccessToken(refreshToken);
    res.status(200).json({accessToken});
  } catch (error) {
    console.error('Error in refreshToken:', error);
    if (error instanceof Error && error.message === 'Invalid refresh token') {
      res.status(401).json({ error: 'Invalid refresh token' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const logout: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    /* This is for the future if we want to add activity logs */
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMe: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    const { passwordHash, ...safeUserData } = user;
    res.status(200).json(safeUserData);
  } catch (error) {
    console.error('Error in getMe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
