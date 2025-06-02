import { RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "@/middleware/auth";
import { services } from "@/db/tables/finance";
import { db } from "@/db/index";
import { like, or } from "drizzle-orm";
import { createServiceSchema } from "caresync/validations/bill.schema";

export const getServices: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { page, size, search } = req.query;

        const availableServices = await db.select().from(services)
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size))
            .where(
                or(
                    like(services.name, `%${search}%`),
                    like(services.description, `%${search}%`)
                )
            );
        res.status(200).json(availableServices);
    } catch (error) {
        console.error('Error in getServices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createService: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsed = createServiceSchema.safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.message });
            return;
        }

        const { name, description, price } = parsed.data;

        const newService = await db.insert(services).values({ name, description, price: price.toString() }).returning();
        res.status(201).json(newService);
    } catch (error) {
        console.error('Error in createService:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}