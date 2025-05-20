import { db } from "@/db";
import { InferInsertModel, InferSelectModel, eq, like } from "drizzle-orm";
import { appointments, bills, clients, medications, prescriptions } from "@/db/schema";
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

    static async getPrescriptions(clientID: number, page: PaginationParams = defaultPaginationParams): Promise<any[]> {
        validatePage(page)

        const clientPrescriptions = await db.select()
            .from(prescriptions)
            .innerJoin(appointments, eq(prescriptions.appointmentID, appointments.appointmentID))
            .innerJoin(medications, eq(prescriptions.medicationID, medications.medicationID))
            .where(eq(appointments.clientID, clientID))
            .orderBy(prescriptions.createdAt)
            .limit(page.size)
            .offset(page.page * page.size)

        return clientPrescriptions;
    }
}