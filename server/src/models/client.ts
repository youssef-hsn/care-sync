import { db } from "@/db";
import { InferInsertModel, InferSelectModel, eq, like } from "drizzle-orm";
import { bills, clients } from "@/db/schema";
import { PaginationParams } from "caresync/types/pagination";
import { defaultPaginationParams, validatePage } from "@/utils/pagination";
import { Bill } from "./finance/bill";

export type Client = InferSelectModel<typeof clients>;
export type NewClient = InferInsertModel<typeof clients>;

export default class ClientModel {

    static async create(data: NewClient): Promise<Client> {
        const [client] = await db.insert(clients)
            .values(data)
            .returning();
        return client;
    }

    static async findById(clientID: number): Promise<Client | null> {
        const [client] = await db.select()
            .from(clients)
            .where(eq(clients.clientID, clientID))
            .limit(1);
        return client || null;
    }

    static async getAll(page: PaginationParams = defaultPaginationParams): Promise<Client[]> {
        validatePage(page)
        const selectedClients = await db.select()
            .from(clients)
            .limit(page.size)
            .offset(page.page * page.size)
        return selectedClients;
    }

    static async findByPhone(phone: string, page: PaginationParams = defaultPaginationParams): Promise<Client[]> {
        validatePage(page)

        const selectedClients = await db.select()
            .from(clients)
            .where(like(clients.phone, phone))
            .limit(page.size)
            .offset(page.page * page.size)
        return selectedClients;
    }

    static async getBills(clientID: number, page: PaginationParams = defaultPaginationParams): Promise<Bill[]> {
        validatePage(page)

        const clientBills = await db.select()
            .from(bills)
            .where(eq(bills.clientId, clientID))
            .orderBy(bills.createdAt)
            .limit(page.size)
            .offset(page.page * page.size)
        return clientBills;
    }
}