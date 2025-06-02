import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import { db } from "@/db";
import { illnesses, medications, prescriptions, records, clientIllness, allergies, hasAllergy, reports, bills } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { hasRoleOrAdmin } from "@/utils/auth";

export const getPrescriptions: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { page, size } = req.query;

        if (Number(clientID) != req.user?.userId && !hasRoleOrAdmin(req.user!, "admin")) {
            res.status(403).json({ error: "You are not authorized to access this resource" });
            return;
        }

        const prescriptionsList = await db.select()
            .from(prescriptions)
            .innerJoin(medications, eq(prescriptions.medicationID, medications.medicationID))
            .where(eq(prescriptions.clientID, Number(clientID)))
            .orderBy(desc(prescriptions.createdAt))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        const formattedPrescriptions = prescriptionsList.map(row => ({
            ...row.medications,
            ...row.prescriptions,
        }));

        res.status(200).json(formattedPrescriptions);
    } catch (error) {
        console.error('Error in getPrescriptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClientRecords: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { page, size } = req.query;

        if (Number(clientID) != req.user?.userId && !hasRoleOrAdmin(req.user!, "admin")) {
            res.status(403).json({ error: "You are not authorized to access this resource" });
            return;
        }

        const clientNotes = await db.select()
            .from(records)
            .where(eq(records.clientID, Number(clientID)))
            .orderBy(desc(records.createdAt))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        res.status(200).json(clientNotes);
    } catch (error) {
        console.error('Error in getClientRecords:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClientIllnessHistory: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { page, size } = req.query;

        if (Number(clientID) != req.user?.userId && !hasRoleOrAdmin(req.user!, "admin")) {
            res.status(403).json({ error: "You are not authorized to access this resource" });
            return;
        }

        const clientIllnessHistory = await db.select({
            clientIllness: clientIllness,
            illness: illnesses
        })
            .from(clientIllness)
            .innerJoin(illnesses, eq(clientIllness.illnessName, illnesses.name))
            .where(eq(clientIllness.clientID, Number(clientID)))
            .orderBy(desc(clientIllness.createdAt))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        const formattedHistory = clientIllnessHistory.map(row => ({
            ...row.clientIllness,
            ...row.illness
        }));

        res.status(200).json(formattedHistory);
    } catch (error) {
        console.error('Error in getClientIllnessHistory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClientAllergies: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { page, size } = req.query;

        if (Number(clientID) != req.user?.userId && !hasRoleOrAdmin(req.user!, "admin")) {
            res.status(403).json({ error: "You are not authorized to access this resource" });
            return;
        }

        const clientAllergies = await db.select()
            .from(hasAllergy)
            .innerJoin(allergies, eq(hasAllergy.allergy, allergies.name))
            .where(eq(hasAllergy.clientID, Number(clientID)))
            .orderBy(desc(hasAllergy.discoveryDate))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        const formattedAllergies = clientAllergies.map(row => ({
            ...row.allergies,
            ...row.has_allergy
        }));

        res.status(200).json(formattedAllergies);
    } catch (error) {
        console.error('Error in getClientAllergies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClientReports: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { page, size } = req.query;

        if (Number(clientID) != req.user?.userId && !hasRoleOrAdmin(req.user!, "admin")) {
            res.status(403).json({ error: "You are not authorized to access this resource" });
            return;
        }

        const clientDocuments = await db.select()
            .from(reports)
            .where(eq(reports.clientID, Number(clientID)))
            .orderBy(desc(reports.createdAt))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        res.status(200).json(clientDocuments);
    } catch (error) {
        console.error('Error in getClientReports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClientBills: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const { page, size } = req.query;
        
        if (Number(clientID) != req.user?.userId && !hasRoleOrAdmin(req.user!, "admin")) {
            res.status(403).json({ error: "You are not authorized to access this resource" });
            return;
        }

        const clientBills = await db.select()
            .from(bills)
            .where(eq(bills.clientId, Number(clientID)))
            .orderBy(desc(bills.createdAt))
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        res.status(200).json(clientBills);
    } catch (error) {
        console.error('Error in getClientBills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
