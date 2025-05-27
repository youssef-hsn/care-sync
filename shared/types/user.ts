export type Share = {
    user?: User;
    amount: number;
    reason: string;
}

export type User = {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}