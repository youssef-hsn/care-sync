import React from "react";
import { cn } from "@/lib/utils/shadcn";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/button";
import { Form, FormField } from "@/components/atoms/form";
import { FormInput, FormPassword } from "@/components/molecules/form-fields";
import { registerFormSchema, type RegisterFormValues } from "caresync/validations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/lib/hooks/use-auth";
import { useNavigate } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation("auth");
  const { storeIdentity } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: async (data) => {
      try {
        const loginData = await authService.login({
          phone: form.getValues("phone"),
          password: form.getValues("password"),
        });
        await storeIdentity(loginData);
        navigate("/dashboard");
      } catch (error) {
        navigate("/signin");
      }
    },
    onError: (error) => {},
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate({
      fullName: registerData.fullName,
      phone: registerData.phone,
      password: registerData.password,
    });
  };

  return (
    <div className={cn("max-w-md mx-auto p-6 bg-background rounded-lg shadow-md", className)} {...props}>
      <Form {...form}>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">{t("register.greeting")}</h1>
          <p className="text-muted-foreground text-balance">
            {t("register.description")}
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormInput
                  label={t("register.name", "Full Name")}
                  placeholder={t("register.name_hint")}
                  disabled={registerMutation.isPending}
                  {...field}
                />
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormInput
                label={t("register.phone", "Phone")}
                type="phone"
                placeholder={t("register.phone_hint", "Enter your phone number")}
                disabled={registerMutation.isPending}
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
                strengthLabels={t("register.password_strength_labels", {returnObjects: true}) as string[]}
                placeholder={t("register.password_hint", "Enter your password")}
                disabled={registerMutation.isPending}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormInput
                label={t("register.confirm_password", "Confirm Password")}
                type="password"
                placeholder={t("register.confirm_password_hint", "Confirm your password")}
                disabled={registerMutation.isPending}
                {...field}
              />
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending 
              ? t("register.submitting", "Registering...") 
              : t("register.action", "Register")}
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"/>
          <div className="text-center text-sm">
            {t("login.prompt") + " "}
            <a href="/signin" className="underline underline-offset-4">
              {t("login.action")}
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}