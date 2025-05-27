import * as z from "zod";

export const billSchema = z.object({
    appointmentID: z.number().min(0, { message: "Appointment is required" }),
    clientID: z.number().min(1, { message: "Client is required" }),
    status: z.enum(["pending", "paid", "cancelled"], { message: "Status is required" }),
    total: z.number().min(1, "total is required"),
    services: z.array(z.object({
        serviceID: z.number().min(1, { message: "Service is required" }),
        reason: z.string().optional(),
        amount: z.number().optional(),
    })).optional(),
    machines: z.array(z.object({
        machineID: z.number().min(1, { message: "Machine is required" }),
        reason: z.string().optional(),
        amount: z.number().optional(),
    })).optional(),
    beneficiaries: z.array(z.object({
        userID: z.number().min(1, { message: "Beneficiary is required" }),
        amount: z.number().optional(),
        reason: z.string().optional(),
    })).optional(),
});

export const createServiceSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(1, { message: "Price is required" }),
})
