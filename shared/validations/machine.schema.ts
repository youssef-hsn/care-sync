import { z } from "zod";

export const machineSchema = z.object({
    name: z.string().min(1),
    manufacturer: z.string().min(1),
    model: z.string().min(1),
    price: z.number().min(0),
});