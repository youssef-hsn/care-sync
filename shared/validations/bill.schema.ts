import * as z from "zod";

export const billSchema = z.object({
    appointmentID: z.number().min(1, { message: "Appointment is required" }),
    status: z.enum(["pending", "paid", "cancelled"], { message: "Status is required" }),
    services: z.array(z.object({
        service: z.string().min(1, { message: "Service is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        reason: z.string().min(1, { message: "Reason is required" }),
        amount: z.number().min(1, { message: "Amount is required" }),
    })),
});
