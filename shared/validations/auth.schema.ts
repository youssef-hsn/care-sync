import * as z from "zod";

export const registerSchema = z
  .object({
    fullName: z.string()
      .min(2, { message: "Full Name is required" })
      .refine((val) => {
        return val.split(" ").length >= 2;
      }, { message: "Full Name must contain at least two words" }),
    phone: z.string().min(8, "Phone number must be atleast 8 numbers  ").refine((val) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(val);
    }, { message: "Phone number must be valid" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      }),
  })

export const registerFormSchema = registerSchema.extend({
    confirmPassword: z.string().min(8, { message: "Confirm your password" }),
  })
  .refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;