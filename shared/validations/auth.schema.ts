import * as z from "zod";

export const registerFormSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full Name is required" }),
    phone: z.number(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;