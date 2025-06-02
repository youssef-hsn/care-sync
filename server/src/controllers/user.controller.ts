import { Request, Response } from "express";
import { users } from "@/db/schema";
import { db } from "@/db";
import { or, like } from "drizzle-orm"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page, size, search } = req.query;

        const availableUsers = await db.select()
            .from(users)
            .where(
                or(
                    like(users.firstName, `%${search as string}%`),
                    like(users.lastName, `%${search as string}%`),
                    like(users.phone, `%${search as string}%`),
                    like(users.email, `%${search as string}%`),
                )
            )
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size));

        res.status(200).json(availableUsers);
    } catch (error) {
        console.error('Error in getUsers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await db.insert(users).values(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error in createUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}