import { BILLS_BASE_URI, CLIENTS_BASE_URI, Page } from "./views";
import { ScrollText, User } from "lucide-react";
import BillPage from "@/pages/app/finance/bill";
import ClientProfilePage from "@/pages/app/client/profile";
export const inspectionsPages: Page[] = [
    {
        title: "viewBill",
        url: BILLS_BASE_URI + "/:id",
        icon: ScrollText,
        page: BillPage,
    },
    {
        title: "viewBill",
        url: CLIENTS_BASE_URI + "/bill/:id",
        icon: ScrollText,
        page: BillPage,
    },
    {
        title: "clientProfile",
        url: CLIENTS_BASE_URI + "/:id/profile",
        icon: User,
        page: ClientProfilePage,
    },
]