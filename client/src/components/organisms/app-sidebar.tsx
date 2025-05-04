import { pages } from "@/lib/constants/app-pages"
import { useLocation, Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar"
import { useTranslation } from "react-i18next"
import { userHasAnyOf } from "@/lib/utils/access-controll"
import { LogOut } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

export function AppSidebar() {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation("sidebar")
  const { clearSession } = useAuth()

  return ((
    <Sidebar side={i18n.dir()==="rtl"?"right": "left"}>
      <SidebarHeader className="flex flex-row items-center">
        <img src="/assets/caresync-logo.jpg" alt="CareSync" className="w-10 h-10 rounded-full"/> CareSync [{i18n.language}]
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) =>
                userHasAnyOf(page.requiredRoles) &&
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild className={pathname==page.url?"bg-accent": ""}>
                    <Link to={page.url}>
                      <page.icon />{t(page.title)}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild onClick={() => clearSession()} className="hover:text-red-600">
          <Link to="/">
            <LogOut />{t("logout")}
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  ))
}
