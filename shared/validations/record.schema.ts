import { z } from "zod";

export const recordSchema = z.object({
    title: z.string().min(1),
    details: z.string().min(1),
});

export const documentSchema = z.object({
    title: z.string().min(1),
    status: z.enum([
        "pending",
        "in_progress",
        "completed",
        "cancelled",
    ]),
});