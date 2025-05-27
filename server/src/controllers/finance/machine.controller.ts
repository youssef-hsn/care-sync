import { Response } from "express";
import { machines } from "@/db/tables/facilities";
import { db } from "@/db/index";
import { like, or } from "drizzle-orm";
import { machineSchema } from "caresync/validations/machine.schema";
import { AuthenticatedRequest } from "@/middleware/auth";

export const getMachines = async (req: AuthenticatedRequest, res: Response) => {
    const {search, page, size} = req.query;
    console.log("getMachines", search, page, size);
    const availableMachines = await db
            .select().from(machines)
            .limit(Number(size))
            .offset((Number(page) - 1) * Number(size))
            .where(
                or(
                    like(machines.name, `%${search}%`),
                    like(machines.model, `%${search}%`),
                    like(machines.manufacturer, `%${search}%`)
                )
            );
    res.status(200).json(availableMachines);
}

export const createMachine = async (req: AuthenticatedRequest, res: Response) => {
    const parsed = machineSchema.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({error: parsed.error.message});
        return;
    }

    const {name, manufacturer, model, price} = parsed.data;

    const machine = await db.insert(machines).values({
        name,
        model,
        price: price.toString(),
        value: "0",
        manufacturer,
        provider: "self",
        clinicId: 1,
        status: "active"
      }).returning();
    res.status(201).json(machine);


}