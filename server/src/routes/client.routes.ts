import express, { Router } from 'express';
import { getClient, getClients, getPrescriptions } from '@/controllers/finance/client.controller';

const router: Router = express.Router();

router.get('/', getClients);
router.get('/:clientID', getClient);
router.get('/:clientID/prescriptions', getPrescriptions);

export default router;
