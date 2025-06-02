import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import { db } from "@/db";
import { prescriptions, medications } from "@/db/schema";
import { medicationSchema, prescriptionSchema } from "caresync/validations/prescription.schema";
import { asc, ilike } from "drizzle-orm";

export const addPrescription: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;

        const { error, data } = prescriptionSchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        const newPrescription = await db.insert(prescriptions).values({
            ...data,
            clientID: Number(clientID),
            doctorID: req.user?.userId!,
            startDate: data.startDate,
            endDate: data.endDate
        });

        res.status(201).json(newPrescription);
    } catch (error) {
        console.error('Error in addPrescription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addMedication: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { error, data } = medicationSchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const newMedication = await db.insert(medications).values(data);

        res.status(201).json(newMedication);
    } catch (error) {
        console.error('Error in addMedication:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getMedications: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { search, page, size } = req.query;

        const availableMedications = await db.select()
            .from(medications)
            .where(ilike(medications.medication, `%${search}%`))
            .orderBy(asc(medications.medication))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        res.status(200).json(availableMedications);
    } catch (error) {
        console.error('Error in getMedications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}