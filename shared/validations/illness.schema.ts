import { z } from "zod";

export const illnessSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
});

export const diagnosisSchema = z.object({
    illnessName: z.string(),
    status: z.enum([
        "active",
        "recovered",
        "chronic",
        "under_treatment",
    ]),
});
