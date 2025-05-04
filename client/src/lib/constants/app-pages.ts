import DashboardPage from "@/pages/app/dashboard";
import WorkInProgress from "@/pages/state/work-in-progress";
import BillsPage from "@/pages/app/client/bills";
import AccountsPage from "@/pages/app/finance/accounts";
import { Home, Calendar, HandCoins, ScrollText, User, GitCompareIcon } from "lucide-react"

export type Page = {
  title: string;
  url: string;
  icon: any;
  page: React.FC;
  requiredRoles?: string[];
}

export const pages: Page[] = [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: Home,
      page: DashboardPage,
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
      page: BillsPage,
    },
    {
      title: "clients",
      url: "/clients",
      icon: User,
      page: WorkInProgress,
      requiredRoles: ["associate"],
    },
    {
      title: "accounts",
      url: "/accounts",
      icon: HandCoins,
      page: AccountsPage,
      requiredRoles: ["associate"],
    },
    {
      title: "machines",
      url: "/machines",
      icon: GitCompareIcon,
      page: WorkInProgress,
      requiredRoles: ["associate"],
    }
]