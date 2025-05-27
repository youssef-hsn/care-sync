import { Router } from "express";
import { createService, getServices } from "@/controllers/client/service.controller";
import { requireRole } from "@/middleware/auth";
import { getMachines, createMachine } from "@/controllers/finance/machine.controller";
import { createUser } from "@/controllers/user.controller";
import { getUsers } from "@/controllers/user.controller";

const router = Router();

router.get("/service", requireRole("associate"), getServices);

router.post("/service", requireRole("associate") , createService);

router.get("/machine", requireRole("associate"), getMachines);

router.post("/machine", requireRole("associate"), createMachine);

router.get("/users", requireRole("associate"), getUsers);

router.post("/users", requireRole("associate"), createUser);

export default router;