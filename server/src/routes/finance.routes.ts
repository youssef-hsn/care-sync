import { getBill } from '@/controllers/finance/bill.controller';
import { getBills, getMyBills } from '@/controllers/finance/client.controller';
import { requireRole } from '@/middleware/auth';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/my-bills', getMyBills);
router.get('/bills', requireRole("Associate"), getBills);
router.get('/bills/:billId/details', getBill);

export default router;