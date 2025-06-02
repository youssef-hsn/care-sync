import { Router } from 'express';
import authRoutes from '@/routes/auth.routes';
import financeRoutes from '@/routes/finance.routes';
import clientRoutes from '@/routes/client.routes';
import { requireAuth } from '@/middleware/auth';
import miscRoutes from './misc.routes';

const router: Router = Router();

router.use((req, res, next) => {
  console.log(req.url);
  try {
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

router.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default router;
