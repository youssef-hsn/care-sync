import express, { Router } from 'express';
import { getClients } from '@/controllers/finance/client.controller';

const router: Router = express.Router();

router.get('/', getClients);
// router.get('/:clientID', getClient);

export default router;
