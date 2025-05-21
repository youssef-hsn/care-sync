import { pages } from "@/lib/constants/pages/views"
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
import { NavUser } from "../molecules/user/nav-user"
import { ThemeSwitcher } from "../molecules/switchers/theme-switch"
import { LanguageSwitcher } from "../molecules/switchers/language-switch"

export function AppSidebar() {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation("sidebar")

  return ((
    <Sidebar side={i18n.dir()==="rtl"?"right": "left"}>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/caresync-logo.jpg" alt="CareSync" className="w-10 h-10 rounded-full"/> CareSync 
        </div>
        <div className="flex flex-row items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) =>
                userHasAnyOf(page.requiredRoles) &&
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton asChild className={pathname.startsWith(page.url)?"bg-accent": ""}>
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  ))
}
