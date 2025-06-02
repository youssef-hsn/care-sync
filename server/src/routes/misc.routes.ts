import { Router } from "express";
import { createService, getServices } from "@/controllers/client/service.controller";
import { requireRole } from "@/middleware/auth";
import { getMachines, createMachine } from "@/controllers/finance/machine.controller";
import { createUser } from "@/controllers/user.controller";
import { getUsers } from "@/controllers/user.controller";
import { addAllergy, addIllness, getAllergies, getIllnesses } from "@/controllers/client/illness.controller";
import { addMedication, addPrescription, getMedications } from "@/controllers/client/prescription.controller";

const router = Router();

router.get("/service", requireRole("associate"), getServices);

router.post("/service", requireRole("associate") , createService);

router.get("/machine", requireRole("associate"), getMachines);

router.post("/machine", requireRole("associate"), createMachine);

router.get("/users", requireRole("associate"), getUsers);

router.post("/users", requireRole("associate"), createUser);

router.post("/illness", requireRole("associate"), addIllness);

router.get("/illness", requireRole("associate"), getIllnesses);

router.post("/medication", requireRole("associate"), addMedication);

router.get("/medications", requireRole("associate"), getMedications);

router.post("/allergy", requireRole("associate"), addAllergy);

router.get("/allergy", requireRole("associate"), getAllergies);


export default router;