import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import BillModel from "@/models/finance/bill";
import { hasRoleOrAdmin } from "@/utils/auth";

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

    if (bill.clientId !== req.user?.userId || hasRoleOrAdmin(req.user, "Associate")) {
        res.status(403).json({ message: "You are not authorized to view this bill" });
        return;
    }

    const billDetails = await BillModel.getBillDetails(Number(billId));

    res.status(200).json({...bill, billDetails});
}
