import express, { Router } from 'express';
import { createClient, getClient, getClients } from '@/controllers/finance/client.controller';
import { getPrescriptions, getClientRecords, getClientIllnessHistory, getClientAllergies, getClientReports, getClientBills } from '@/controllers/client-details.controller';
import { addDiagnosis, registerAllergyCase } from '@/controllers/client/illness.controller';
import { addPrescription } from '@/controllers/client/prescription.controller';
import { addRecord, downloadDocument, requestDocument, uploadDocument } from '@/controllers/client/client-documents.controller';
import multer from "multer";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.get('/:clientID', getClient);
router.get('/:clientID/prescriptions', getPrescriptions);
router.get('/:clientID/bills', getClientBills);
router.get('/:clientID/records', getClientRecords);
router.get('/:clientID/illness-history', getClientIllnessHistory);
router.get('/:clientID/allergies', getClientAllergies);
router.get('/:clientID/reports', getClientReports);

router.post('/:clientID/diagnosis', addDiagnosis);
router.post('/:clientID/prescription', addPrescription);
router.post('/:clientID/allergy', registerAllergyCase);
router.post('/:clientID/records', addRecord );

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'documents');
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
  
const upload = multer({ storage });


router.get('/:clientID/documents', requestDocument);
router.post('/:clientID/documents', upload.single('file'), uploadDocument);
router.get('/:clientID/documents/:documentID', downloadDocument);

export default router;
