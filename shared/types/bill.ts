export type BillStatus = "pending" | "paid" | "cancelled";

export type BillDetail = {
    service: string;
    description: string;
    reason: string;
    amount: number;
}
export type Bill = {
    billID: number;
    clientID: number;
    appointmentID?: number;
    createdAt: Date;
    updatedAt: Date;
    total: number;
    status: BillStatus;
    services?: BillDetail[];
}