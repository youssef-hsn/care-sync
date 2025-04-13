import { pgTable, integer, text, varchar, timestamp, numeric, pgEnum, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    userID: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    passwordHash: text("password_hash"),
    email: varchar("email", { length: 255 }).unique(),
    phone: varchar("phone", { length: 15 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const roles = pgEnum("role", [
    "admin",
    "associate",
    "investor",
    "client",
    "sender",
]);

export const userRoles = pgTable("user_roles", {
    userID: integer("user_id").notNull().references(() => users.userID),
    role: roles().notNull(),
}, (table) => [
    primaryKey({ columns: [table.userID, table.role] }),
]);


export const associates = pgTable("associates", {
    associateID: integer("user_id").notNull().primaryKey().references(() => users.userID),
    specialty: varchar("specialty", { length: 255 }).notNull(),
    salary: numeric("salary", { precision: 10, scale: 2 }).notNull(),
    creditDate: timestamp("credit_date").defaultNow().notNull(),
    account: varchar("account", { length: 255 }).notNull(),
    amountOwed: numeric("amount_owed", { precision: 10, scale: 2 }).notNull(),
});
