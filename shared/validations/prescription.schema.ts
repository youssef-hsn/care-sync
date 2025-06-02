import { z } from "zod";

export const prescriptionSchema = z.object({
    medicationID: z.number(),
    frequency: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(["active", "inactive", "completed", "cancelled"]),
    instructions: z.string(),
    doctorID: z.number(),
});

export const medicationSchema = z.object({
    medication: z.string(),
    dosage: z.string(),
});