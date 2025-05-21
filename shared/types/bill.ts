export type BillDetail = {
    service: string;
    description: string;
    reason: string;
    amount: number;
}

export type Bill = {
    billID: number;
    clientID?: number;
    createdAt: Date;
    updatedAt: Date;
    total: number;
    status: string;
    services?: BillDetail[];
}