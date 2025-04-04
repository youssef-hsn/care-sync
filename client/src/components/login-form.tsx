import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "react-i18next"
import heroImage from "@/assets/secure-healthcare.png"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {t} = useTranslation("auth")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={heroImage}
              className="absolute inset-0 h-full w-full object-center dark:brightness-[0.2] dark:grayscale bg-muted"
            />
          </div>
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{t("login.greeting")}</h1>
                <p className="text-muted-foreground text-balance">
                  {t("login.description")}
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="identifier">{t("login.identifier")}</Label>
                <Input
                  id="identifier"
                  type="phone"
                  placeholder={t("login.identifier_hint")}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("password")}</Label>
                </div>
                <Input id="password" type="password" placeholder={t("login.password_hint")} required />
                <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {t("login.forgot_password")}
                  </a>
              </div>
              
              <Button type="submit" className="w-full">
                {t("login.login")}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              </div>
              <div className="text-center text-sm">
                {t("register.prompt") + " "}
                <a href="/signup" className="underline underline-offset-4">
                  {t("register.action")}
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
