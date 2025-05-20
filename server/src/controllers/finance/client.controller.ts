import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import BillModel from "@/models/finance/bill";
import ClientModel from "@/models/client";

export const getBills: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { page, size } = req.query;
    const bills = await BillModel.getBills({ page: Number(page), size: Number(size) });
    res.status(200).json(bills);
}

export const getClients: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { page, size } = req.query;
    const clients = await ClientModel.getAll({ page: Number(page), size: Number(size) });
    res.status(200).json(clients);
}

export const getClient: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { clientID } = req.params;
    const client = await ClientModel.findById(Number(clientID));
    res.status(200).json(client);
}

export const getMyBills: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { page, size } = req.query;
    const bills = await ClientModel.getBills(req.user!.userId, { page: Number(page), size: Number(size) });
    res.status(200).json(bills);
}

export const getPrescriptions: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    const { clientID } = req.params;
    const prescriptions = await ClientModel.getPrescriptions(Number(clientID));
    res.status(200).json(prescriptions);
}