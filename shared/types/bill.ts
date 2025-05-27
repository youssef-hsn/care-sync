export type BillStatus = "pending" | "paid" | "cancelled";

export type Service = {
    serviceID: number;
    name: string;
    description: string;
    price: number;
}

export type BillDetail = {
    service: Service | null;
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