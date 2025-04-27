import WorkInProgress from "@/pages/state/work-in-progress";
import { Home, Calendar, HandCoins, ScrollText, User, GitCompareIcon } from "lucide-react"

export type Page = {
  title: string;
  url: string;
  icon: any;
  page: React.FC;
  requiredRoles?: Set<string>;
}

export const pages: Page[] = [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: Home,
      page: WorkInProgress,
    },
    {
      title: "schedule",
      url: "/schedule",
      icon: Calendar,
      page: WorkInProgress,
    },
    {
      title: "bills",
      url: "/bills",
      icon: ScrollText,
      page: WorkInProgress,
    },
    {
      title: "clients",
      url: "/clients",
      icon: User,
      page: WorkInProgress,
      requiredRoles: new Set(["associate"]),
    },
    {
      title: "accounts",
      url: "/accounts",
      icon: HandCoins,
      page: WorkInProgress,
      requiredRoles: new Set(["associate"]),
    },
    {
      title: "machines",
      url: "/machines",
      icon: GitCompareIcon,
      page: WorkInProgress,
      requiredRoles: new Set(["associate"]),
    }
]