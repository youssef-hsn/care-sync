import { pgTable, text, integer, numeric, varchar, primaryKey, pgEnum } from "drizzle-orm/pg-core";

export const clinics = pgTable("clinics", {
    clinicId: integer("clinic_id").primaryKey().generatedByDefaultAsIdentity(),
    room: text("room").notNull(),
    phone: varchar("phone", { length: 15 }).notNull(),
    ownerId: integer("owner_id").notNull(),
});

export const machineStates = pgEnum("machine_states", [
    "active",
    "inactive",
    "under_maintenance",
    "decommissioned",
    "out_of_order",
]);

export const machines = pgTable("machines", {
    machineId: integer("machine_id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    model: text("model").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    value: numeric("value", { precision: 10, scale: 2 }).notNull(),
    manufacturer: text("manufacturer").notNull(),
    provider: text("provider").notNull(),
    clinicId: integer("clinic_id").notNull(),
    status: machineStates().notNull().default("active"),
});

export const operates = pgTable("operates", {
    associateId: integer("associate_id").notNull(),
    machineId: integer("machine_id").notNull(),
}, (table) => ({
    pk: primaryKey({columns: [table.associateId, table.machineId]}),
}));

export const ownsMachine = pgTable("owns_machine", {
    machineId: integer("machine_id").notNull(),
    investorId: integer("investor_id").notNull(),
    share: numeric("share", { precision: 5, scale: 2 }).notNull(),
}, (table) => [
    primaryKey({columns: [table.machineId, table.investorId]}),
]);

export const machineDonation = pgTable("machine_donation", {
    machineID: integer("machine_id").notNull(),
    charityID: integer("charity_id").notNull(),
    donatedShare: numeric("donated_share", { precision: 5, scale: 2 }).notNull(),
}, (table) => [
    primaryKey({columns: [table.machineID, table.charityID]}),
]);

export const charities = pgTable("charities", {
    charityID: integer("charity_id").primaryKey().generatedByDefaultAsIdentity(),
    name: text("name").notNull(),
    purpose: text("purpose").notNull(),
    contactInfo: text("contact_info").notNull(),
});
