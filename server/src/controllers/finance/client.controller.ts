import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import BillModel from "@/models/finance/bill";
import ClientModel from "@/models/client";
import { db } from "@/db";
import { clients, users } from "@/db/schema";
import { clientSchema } from "caresync/validations/user.schema";

export const getBills: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page, size, search } = req.query;
        const bills = await BillModel.getBills({ page: Number(page), size: Number(size), search: search as string });
        res.status(200).json(bills);
    } catch (error) {
        console.error('Error in getBills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClients: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page, size, search } = req.query;
        const clients = await ClientModel.getAll({ page: Number(page), size: Number(size), search: search as string });
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error in getClients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getClient: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID } = req.params;
        const client = await ClientModel.findById(Number(clientID));
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        res.status(200).json(client);
    } catch (error) {
        console.error('Error in getClient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getMyBills: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page, size } = req.query;
        const bills = await ClientModel.getBills(req.user!.userId, { page: Number(page), size: Number(size) });
        res.status(200).json(bills);
    } catch (error) {
        console.error('Error in getMyBills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createClient: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsed = clientSchema.safeParse(req.body.client);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.message });
            return;
        }

        const [newUser] = await db.insert(users).values({
            ...parsed.data,
        }).returning();

        const newClient = await db.insert(clients).values({
            ...parsed.data,
            clientID: newUser.userID,
        });

        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error in createClient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}