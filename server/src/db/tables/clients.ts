import { pgTable, text, date, integer, primaryKey, AnyPgColumn, pgEnum, varchar } from "drizzle-orm/pg-core";
import { users, appointments } from "@/db/schema";

export const bloodTypes = pgEnum("blood_types", [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
]);

export const clients = pgTable("clients", {
    clientID: integer("client_id").primaryKey().references(() => users.userID),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    birthDate: date("birth_date"),
    bloodType: bloodTypes(),
    responsible: integer("responsible").references((): AnyPgColumn => clients.clientID),
});

export const illnesses = pgTable("illnesses", {
    name: varchar("name", { length: 255 }).primaryKey(),
    description: text("description"),
});

export const illnessStates = pgEnum("illness_states", [
    "active",
    "recovered",
    "chronic",
    "under_treatment",
]);

export const clientIllness = pgTable("client_illness", {
    clientID: integer("client_id")
        .notNull()
        .references(() => clients.clientID),
    illnessName: varchar("name", { length: 255 })
        .notNull()
        .references(() => illnesses.name),
    doctorID: integer("doctor_id").notNull(),
    status: illnessStates().notNull(),
    createdAt: date("created_at").defaultNow(),
    updatedAt: date("updated_at").defaultNow(),
}, (table) => ({
    pk: primaryKey({columns: [table.clientID, table.illnessName, table.doctorID]}),
}));

export const medications = pgTable("medications", {
    medicationID: integer("medication_id").primaryKey().generatedAlwaysAsIdentity(),
    medication: varchar("medication", { length: 255 }).notNull(),
    dosage: varchar("dosage", { length: 10 }).notNull(),
});

export const allergies = pgTable("allergies", {
    name: varchar("name", { length: 255 }).primaryKey(),
    description: text("description"),
});

export const allergy_includes = pgTable("allergy_includes", {
    allergy: varchar("allergy", { length: 255 }).notNull().references(() => allergies.name),
    medication: text("medication").notNull(),
});

export const allergySeverity = pgEnum("allergySeverity", [
    "mild",
    "moderate",
    "severe",
]);

export const hasAllergy = pgTable("has_allergy", {
    appointmentID: integer("appointment_id").references(() => appointments.appointmentID),
    clientID: integer("client_id").references(() => clients.clientID),
    allergy: varchar("allergy", { length: 255 }).notNull().references(() => allergies.name),
    reaction: text("reaction"),
    severity: allergySeverity(),
    note: text("note"),
    discoveryDate: date("discoveryDate"),
});
