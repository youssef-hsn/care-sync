export type BillDetail = {
    service: string;
    description: string;
    reason: string;
    amount: number;
}

export type Bill = {
    billID: number;
    clientID: number;
    billDate: Date;
    billAmount: number;
    billStatus: string;
    services?: BillDetail[];
}