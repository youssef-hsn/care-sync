import { z } from "zod";

export const allergySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
});

export const allergyCaseSchema = z.object({
    allergy: z.string().min(1),
    reaction: z.string().min(1),
    severity: z.enum([
        "mild",
        "moderate",
        "severe",
    ]),
    note: z.string().min(1),
    discoveryDate: z.string().min(1),
});