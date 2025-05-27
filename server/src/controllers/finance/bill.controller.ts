import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import BillModel from "@/models/finance/bill";
import { hasRoleOrAdmin, TokenPayload } from "@/utils/auth";
import { billSchema } from "caresync/validations/bill.schema";
import { db } from "@/db";
import { billReasons, bills, sharesBills, usedMachines } from "@/db/tables/finance";

export const getBills: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { page, size } = req.query;
    const bills = await BillModel.getBills({ page: Number(page), size: Number(size) });
    res.status(200).json(bills);
}

export const getBill: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { billId } = req.params;
    const bill = await BillModel.getBill(Number(billId));
    if (!bill) {
        res.status(404).json({ message: "Bill not found" });
        return;
    }

    if (bill.clientId !== req.user?.userId && !hasRoleOrAdmin(req.user as TokenPayload, "Associate")) {
        res.status(403).json({ message: "You are not authorized to view this bill" });
        return;
    }

    const billDetails = await BillModel.getBillDetails(Number(billId));

    res.status(200).json({...bill, billDetails});
}

export const createBill: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const bill = req.body;
        const parsed = billSchema.safeParse(bill);
        console.log(parsed.error);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.message });
            return;
        }

        const { total, status, clientID, services, machines, beneficiaries } = parsed.data;

        const newBill = await db.insert(bills).values({
            total: total.toFixed(2),
            status,
            clientId: clientID,
        }).returning();

        const billID = newBill[0].billID;

        const providedServices = services!.length > 0 ? await db.insert(billReasons).values(services!.map((service) => ({
            billID,
            serviceId: service.serviceID,
            reason: service.reason ?? "",
            amount: service.amount?.toFixed(2) ?? "0",
        }))) : null;

        const machineUses = machines!.length > 0 ? await db.insert(usedMachines).values(machines!.map((machine) => ({
            machineID: machine.machineID,
            billID,
            reason: machine.reason ?? "",
            amount: machine.amount?.toFixed(2) ?? "0",
        }))) : null;

        const beneficiariesShares = beneficiaries!.length > 0 ? await db.insert(sharesBills).values(beneficiaries!.map((beneficiary) => ({
            billID,
            userID: beneficiary.userID,
            amount: beneficiary.amount?.toFixed(2) ?? "0",
            status: "pending" as const,
        }))) : null;

        res.status(201).json({
            bill: newBill[0],
            appointment: null,
            services: providedServices,
            machines: machineUses,
            beneficiaries: beneficiariesShares,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
