import { Request, Response } from "express";
import { users } from "@/db/schema";
import { db } from "@/db";
import { or, like } from "drizzle-orm"

export const getUsers = async (req: Request, res: Response) => {
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
}

export const createUser = async (req: Request, res: Response) => {
    const user = await db.insert(users).values(req.body);
    res.status(201).json(user);
}