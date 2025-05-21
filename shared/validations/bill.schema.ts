import * as z from "zod";

export const billSchema = z.object({
    total: z.number().min(1, { message: "Total is required" }),
    
});
