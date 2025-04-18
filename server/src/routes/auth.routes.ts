import { Router } from 'express';
import { getMe, login, logout, refreshToken } from '@/controllers/auth/identity.controller';
import { register } from '@/controllers/auth/register.controller';
import { requireAuth } from '@/middleware/auth';
import cookieParser from 'cookie-parser';

const router: Router = Router();

router.post('/register', register);
router.post('/login', cookieParser(), login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);
router.post('/refresh', cookieParser(), refreshToken);

export default router;
