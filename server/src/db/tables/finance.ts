import { pgTable, integer, text, numeric, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { users, associates } from "@/db/schema";

export const paymentStates = pgEnum("payment_states", [
    "pending",
    "paid",
    "cancelled",
]);

export const bills = pgTable("bills", {
    billID: integer("bill_id").primaryKey().generatedByDefaultAsIdentity(),
    total: numeric("total"),
    date: timestamp("date"),
    status: paymentStates().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const services = pgTable("services", {
    serviceId: integer("service_id").primaryKey().generatedByDefaultAsIdentity(),
    amount: numeric("amount"),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
});

export const billReasons = pgTable("bill_reasons", {
    billID: integer("bill_id").references(() => bills.billID),
    serviceId: integer("service_id").notNull(),
});



export const payments = pgTable("payments", {
    paymentID: integer("payment_id").primaryKey().generatedByDefaultAsIdentity(),
    billID: integer("bill_id").references(() => bills.billID),
    amount: numeric("amount"),
    date: timestamp("date").defaultNow(),
    method: varchar("method", { length: 50 }),
});

export const expenses = pgTable("expenses", {
    expenseID: integer("expense_id").primaryKey().generatedAlwaysAsIdentity(),
    amount: numeric("amount"),
    category: varchar("category", { length: 50 }),
    date: timestamp("date"),
    description: text("description"),
    payerId: integer("payer_id").references(() => associates.associateID),
    status: paymentStates().notNull(),
});

export const sharesBills = pgTable("shares_bills", {
    billID: integer("bill_id").references(() => bills.billID),
    userID: integer("user_id").notNull().references(() => users.userID),
    amount: numeric("amount"),
    status: paymentStates().notNull(),
});