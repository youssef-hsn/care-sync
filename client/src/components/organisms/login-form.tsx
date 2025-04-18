import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { useTranslation } from "react-i18next"
import heroImage from "@/assets/secure-healthcare.png"
import { LabeledInput, LabeledPasswordInput as PasswordInput } from "@/components/molecules/labeled-input"
import FormWithHero from "@/components/templates/form-with-hero"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/services/auth.service"
import { useAuth } from "@/lib/hooks/use-auth"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {t} = useTranslation("auth")
  const navigate = useNavigate()
  const { storeIdentity } = useAuth()

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      await storeIdentity(data)
      navigate("/dashboard")
    },
    onError: (error) => {
      console.error("Login failed", error)
    },
  })

  const login = (credentials: FormData) => {
    loginMutation.mutate({
      phone: credentials.get('phone') as string,
      password: credentials.get('password') as string,
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FormWithHero heroImage={heroImage} action={login}>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">{t("login.greeting")}</h1>
          <p className="text-muted-foreground text-balance">
            {t("login.description")}
          </p>
        </div>

        <LabeledInput labelFor="phone" label={t("login.identifier")} placeholder={t("login.identifier_hint")} name="phone" required/>
        <PasswordInput label={t("password")} placeholder={t("login.password_hint")} required>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            {t("login.forgot_password")}
          </a>
        </PasswordInput>
        

        <Button type="submit" className="w-full">
          {t("login.action")}
        </Button>
        
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"/>
        <div className="text-center text-sm">
          {t("register.prompt") + " "}
          <a href="/signup" className="underline underline-offset-4">
            {t("register.action")}
          </a>
        </div>
    </FormWithHero>
    </div>
  )
}
