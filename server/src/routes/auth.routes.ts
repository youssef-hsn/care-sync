import { Router } from 'express';
import { getMe, login, logout, refreshToken } from '@/controllers/auth/identity.controller';
import { register } from '@/controllers/auth/register.controller';
import { requireAuth } from '@/middleware/auth';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);
router.post('/refresh', refreshToken);

export default router;
