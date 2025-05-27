import * as z from "zod";

export const userSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.string().email({ message: "Invalid email" }).optional(),
})

export const clientSchema = userSchema.extend({
    responsibleId: z.number().min(1, { message: "Responsible is required" }),
})