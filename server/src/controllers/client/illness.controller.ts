import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import { db } from "@/db";
import { illnesses, clientIllness, allergies, hasAllergy } from "@/db/schema";
import { illnessSchema, diagnosisSchema } from "caresync/validations/illness.schema";
import { ilike, or, eq } from "drizzle-orm";
import { allergyCaseSchema, allergySchema } from "caresync/validations/allergy.schema";

export const addIllness: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { error, data } = illnessSchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const newIllness = await db.insert(illnesses).values(data);

        res.status(201).json(newIllness);
    } catch (error) {
        console.error('Error in addIllness:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addDiagnosis: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { error, data } = diagnosisSchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const newDiagnosis = await db.insert(clientIllness).values({
            ...data,
            clientID: Number(clientID),
            doctorID: Number(req.user?.userId!),
        });

        res.status(201).json(newDiagnosis);
    } catch (error) {
        console.error('Error in addDiagnosis:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getIllnesses: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page, size, search } = req.query;
        const ills = await db.select().from(illnesses)
            .limit(Number(size))
            .offset((Number(page)-1)*Number(size))
            .where(
                or(
                    ilike(illnesses.name, `%${search}%`),
                    ilike(illnesses.description, `%${search}%`)
                )
            );

        res.status(200).json(ills);
    } catch (error) {
        console.error('Error in getIllnesses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addAllergy: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { error, data } = allergySchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const newAllergy = await db.insert(allergies).values(data);

        res.status(201).json(newAllergy);
    } catch (error) {
        console.error('Error in addAllergy:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const registerAllergyCase: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { error, data } = allergyCaseSchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const newAllergyCase = await db.insert(hasAllergy).values({
            ...data,
            clientID: Number(clientID),
        });

        res.status(201).json(newAllergyCase);
    } catch (error) {
        console.error('Error in registerAllergyCase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllergies: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page, size, search } = req.query;
        const registeredAllergies = await db.select().from(allergies)
            .limit(Number(size))
            .offset((Number(page)-1)*Number(size))
            .where(
                or(
                    ilike(allergies.name, `%${search}%`),
                    ilike(allergies.description, `%${search}%`)
                )
            );

        res.status(200).json(registeredAllergies);
    } catch (error) {
        console.error('Error in getAllergies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}