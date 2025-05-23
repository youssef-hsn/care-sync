import { pgTable, text, integer, timestamp, varchar, date, time, pgEnum } from "drizzle-orm/pg-core";
import { clients, associates, bills, medications } from "@/db/schema";

export const appointmentStates = pgEnum("appointment_states", [
    "pending",
    "confirmed",
    "cancelled",
    "completed",
])

export const appointments = pgTable("appointments", {
    appointmentID: integer("appointment_id").primaryKey().generatedAlwaysAsIdentity(),
    clientID: integer("client_id").references(() => clients.clientID),
    associateID: integer("associate_id").references(() => associates.associateID),
    confirmedBy: integer("confirmed_by").references(() => associates.associateID),
    reason: text("reason"),
    date: date("date").notNull(),
    time: time("time").notNull(),
    status: appointmentStates().notNull(),
    billID: integer("bill_id").references(() => bills.billID),
    groupName: varchar("group_name", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reportStates = pgEnum("report_states", [
    "pending",
    "in_progress",
    "completed",
    "cancelled",
]);

export const reports = pgTable("reports", {
    reportID: integer("report_id").primaryKey().generatedAlwaysAsIdentity(),
    clientID: integer("client_id").notNull().references(() => clients.clientID),
    title: varchar("title", { length: 255 }).notNull(),
    fileURI: text("file_uri").notNull(),
    status: reportStates().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const records = pgTable("records", {
    recordID: integer("record_id").primaryKey().generatedAlwaysAsIdentity(),
    clientID: integer("client_id").notNull().references(() => clients.clientID),
    title: varchar("title", { length: 255 }).notNull(),
    details: text("details"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const prescriptionStates = pgEnum("prescription_states", [
    "active",
    "inactive",
    "completed",
    "cancelled",
]);

export const prescriptions = pgTable("prescriptions", {
    clientID: integer("client_id").notNull().references(() => clients.clientID),
    medicationID: integer("medication_id").notNull().references(() => medications.medicationID),
    frequency: varchar("frequency", { length: 100 }).notNull(),
    instructions: varchar("instructions", { length: 255 }),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    status: prescriptionStates().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
