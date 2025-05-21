import { db } from "@/db";
import { paymentStates, bills, billReasons, services } from "@/db/schema";
import { InferSelectModel, InferInsertModel, eq } from "drizzle-orm";
import { PaginationParams } from "caresync/types/pagination";
import { defaultPaginationParams, validatePage } from "@/utils/pagination";

export type Bill = InferSelectModel<typeof bills>;
export type NewBill = InferInsertModel<typeof bills>;
export type BillReason = InferInsertModel<typeof billReasons>;
export type BillStatus = typeof paymentStates.enumValues[number];
export type BillDetail = {
    service: string;
    description: string;
    reason: string;
    amount: number;
}

export default class BillModel {
    static async createBill(
        newBill: NewBill & { services: BillReason[] }
    ) {
        const [bill] = await db.insert(bills).values(newBill).returning();
        
        const reasons = db.insert(billReasons).values(newBill.services.map(
            (service) => ({...service, billID: bill.billID})
        )).returning();

        return {...bill, includedServices: reasons};
    }
    
    static async getBill(billId: number): Promise<Bill | null> {
        const [bill] = await db.select()
            .from(bills)
            .where(eq(bills.billID, billId))
            .limit(1);

        return bill;
    }

    static async getBillDetails(billId: number): Promise<BillDetail[]> {
        const billDetails = await db.select()
            .from(billReasons)
            .innerJoin(services, eq(billReasons.serviceId, services.serviceId))
            .where(eq(billReasons.billID, billId));

        return billDetails.map((
            {bill_reasons: bill, services: service}) => {
            return {
                service: service.title,
                description: service.description,
                reason: bill.reason,
                amount: Number(service.amount),
        } as BillDetail;
        });
    }



    static async getBills(page: PaginationParams = defaultPaginationParams) {
        validatePage(page);

        const billsList = await db.select()
            .from(bills)
            .orderBy(bills.createdAt)
            .limit(page.size)
            .offset(page.page * page.size)

        return billsList;
    }
}
