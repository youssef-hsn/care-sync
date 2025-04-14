import express, { Router } from 'express';
import { Request, Response } from 'express';

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {});
router.post('/login', async (req: Request, res: Response) => {});
router.get('/logout', async (req: Request, res: Response) => {});
router.get('/me', async (req: Request, res: Response) => {});
router.post('/refresh-token', async (req: Request, res: Response) => {});

export default router;
