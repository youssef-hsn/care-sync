import { ScrollText } from "lucide-react";
import { Page, BILLS_BASE_URI } from "./views";
import CreateBillPage from "@/pages/app/finance/create-bill";


export const activitiesPages: Page[] = [
    {
        title: "createBill",
        url: BILLS_BASE_URI + "/new",
        icon: ScrollText,
        page: CreateBillPage,
    },
];