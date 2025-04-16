import { Request, RequestHandler, Response } from 'express';
import AuthModel from '@/models/auth';
import { TokenPayload } from '@/utils/auth';
import { UserModel } from '@/models/user';
import { AuthenticatedRequest } from '@/middleware/auth';

export const login: RequestHandler = async (req: Request, res: Response) => {
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
  const tokenPair = AuthModel.generateTokenPair(payload);
  res.status(200).json(tokenPair);
};

export const refreshToken: RequestHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ error: 'Missing refresh token' });
    return;
  }
  try {
    const accessToken = AuthModel.refreshAccessToken(refreshToken);
    res.status(200).json({accessToken});
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const logout: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  /* This is for the future if we want to add activity logs */
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
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
}
