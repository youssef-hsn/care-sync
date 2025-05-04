import express, { Router } from 'express';
import authRoutes from '@/routes/auth.routes';
import financeRoutes from '@/routes/finance.routes';
import clientRoutes from '@/routes/client.routes';
import { requireAuth } from '@/middleware/auth';

const router: Router = express.Router();

router.use('/auth', authRoutes);

router.use('/finance', requireAuth, financeRoutes);
router.use('/client', requireAuth, clientRoutes);

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    message: "Server is up",
    timestamp: new Date().toISOString()
  });
});

export default router;
