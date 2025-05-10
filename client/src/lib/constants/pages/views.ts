import DashboardPage from "@/pages/app/dashboard";
import WorkInProgress from "@/pages/state/work-in-progress";
import BillsPage from "@/pages/app/client/bills";
import ClientBillsPage from "@/pages/app/finance/client-bills";
import { Home, Calendar, HandCoins, ScrollText, User, GitCompareIcon } from "lucide-react"
import ClientsPage from "@/pages/app/client/all";

export type Page = {
  title: string;
  url: string;
  icon: any;
  page: React.FC;
  requiredRoles?: string[];
}

export const DASHBOARD_BASE_URI = "/dashboard";

export const SCHEDULE_BASE_URI = "/schedule";

export const BILLS_BASE_URI = "/bills";

export const CLIENTS_BASE_URI = "/clients";

export const MACHINES_BASE_URI = "/machines";

export const pages: Page[] = [
    {
      title: "dashboard",
      url: DASHBOARD_BASE_URI,
      icon: Home,
      page: DashboardPage,
    },
    {
      title: "schedule",
      url: SCHEDULE_BASE_URI,
      icon: Calendar,
      page: WorkInProgress,
    },
    {
      title: "bills",
      url: BILLS_BASE_URI,
      icon: ScrollText,
      page: BillsPage,
    },
    {
      title: "clients",
      url: CLIENTS_BASE_URI,
      icon: User,
      page: ClientsPage,
      requiredRoles: ["associate"],
    },
    {
      title: "clientBills",
      url: CLIENTS_BASE_URI + "/bills",
      icon: HandCoins,
      page: ClientBillsPage,
      requiredRoles: ["associate"],
    },
    {
      title: "machines",
      url: MACHINES_BASE_URI,
      icon: GitCompareIcon,
      page: WorkInProgress,
      requiredRoles: ["associate"],
    }
]