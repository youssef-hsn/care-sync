import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyAccessToken, TokenPayload, hasRoleOrAdmin } from '../utils/auth';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const requireAuth: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization header required' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const user = verifyAccessToken(token);
    if (!user) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
    req.user = user;
    
    next();
  } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
  }
};

export const requireRole = (role: string): RequestHandler => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !hasRoleOrAdmin(req.user, role)) {
      res.status(403).json({ message: `This action requires ${role} role`});
      return
    }
    next();
  };
}
