export type Machine = {
    machineId: number;
    name: string;
    model: string;
    manufacturer: string;
    price: number;
}

export type MachineUsage = {
    machine: Machine | null;
    reason: string;
    amount: number;
}