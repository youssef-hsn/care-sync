import { AuthenticatedRequest } from "@/middleware/auth";
import { RequestHandler, Response } from "express";
import { db } from "@/db";
import { records, reports } from "@/db/schema";
import { documentSchema, recordSchema } from "caresync/validations/record.schema";
import { eq } from "drizzle-orm"
import multer from "multer";


export const addRecord: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { error, data } = recordSchema.safeParse(req.body);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        const newRecord = await db.insert(records).values({
            ...data,
            clientID: Number(req.params.clientID),
        });

        res.status(201).json(newRecord);
    } catch (error) {
        console.error('Error in addRecord:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const requestDocument: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const { clientID } = req.params;

      const { error, data } = documentSchema.safeParse(req.body);

      if (error) {
          res.status(400).json({ error: error.message });
          return;
      }

      const newDocument = await db.insert(reports).values({
          ...data,
          clientID: Number(clientID),
          fileURI: "",
          status: "pending",
      });

      res.status(201).json(newDocument);
  } catch (error) {
      console.error('Error in requestDocument:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

export const uploadDocument: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { clientID, documentID } = req.params;
        const file = req.file as Express.Multer.File;

        if (!file) {
            res.status(400).json({ error: 'No file uploaded.' });
            return;
        }

        const fileURI = file.path;

        await db.update(reports).set({ fileURI, status: "completed" }).where(eq(reports.reportID, Number(documentID)));

        res.status(200).json({ message: 'Document uploaded successfully' });

    } catch (error) {
        console.error('Error in uploadDocument:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const downloadDocument: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { documentID } = req.params;

        const document = await db.select().from(reports).where(eq(reports.reportID, Number(documentID)));

        if (!document) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }

        const file = document[0].fileURI;

        res.status(200).download(file);
    } catch (error) {
        console.error('Error in downloadDocument:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}