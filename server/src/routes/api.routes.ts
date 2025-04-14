import express, { Router } from 'express';
import authRoutes from '@/routes/auth.routes';

const router: Router = express.Router();

router.use('/auth', authRoutes);

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    message: "Server is up",
    timestamp: new Date().toISOString()
  });
});

export default router;
