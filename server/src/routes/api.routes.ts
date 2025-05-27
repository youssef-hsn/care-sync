import { Router } from 'express';
import authRoutes from '@/routes/auth.routes';
import financeRoutes from '@/routes/finance.routes';
import clientRoutes from '@/routes/client.routes';
import { requireAuth } from '@/middleware/auth';
import miscRoutes from './misc.routes';

const router: Router = Router();

router.use('/auth', authRoutes);

router.use('/finance', requireAuth, financeRoutes);
router.use('/client', requireAuth, clientRoutes);

router.use(requireAuth, miscRoutes);

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    message: "Server is up",
    timestamp: new Date().toISOString()
  });
});

export default router;
