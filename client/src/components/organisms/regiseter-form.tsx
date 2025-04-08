import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Form, FormField } from "@/components/atoms/form";
import { FormInput, FormPassword } from "@/components/molecules/form-fields";

// Define a validation schema using zod
const formSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: "Password must contain at least one lowercase letter, one uppercase letter, and one number" }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof formSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation("auth");
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Registering user with data:", data);
  };

  return (
    <div className={cn("max-w-md mx-auto p-6 bg-white rounded-lg shadow-md", className)} {...props}>
      <h2 className="text-2xl font-bold text-center mb-6">
        {t("registerTitle", "Register")}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormInput
                  label={t("fullName", "Full Name")}
                  placeholder={t("fullNamePlaceholder")}
                  {...field}
                />
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput
                label={t("email", "Email")}
                placeholder={t("emailPlaceholder", "Enter your email")}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormPassword
                label={t("password", "Password")}
                placeholder={t("passwordPlaceholder", "Enter your password")}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormInput
                label={t("confirmPassword", "Confirm Password")}
                type="password"
                placeholder={t("confirmPasswordPlaceholder", "Confirm your password")}
                {...field}
              />
            )}
          />

          <Button type="submit" className="w-full">
            {t("registerButton", "Register")}
          </Button>
        </form>
      </Form>
    </div>
  );
}