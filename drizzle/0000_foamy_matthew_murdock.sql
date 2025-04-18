CREATE TYPE "public"."role" AS ENUM('admin', 'associate', 'investor', 'client', 'sender');--> statement-breakpoint
CREATE TYPE "public"."allergySeverity" AS ENUM('mild', 'moderate', 'severe');--> statement-breakpoint
CREATE TYPE "public"."blood_types" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');--> statement-breakpoint
CREATE TYPE "public"."illness_states" AS ENUM('active', 'recovered', 'chronic', 'under_treatment');--> statement-breakpoint
CREATE TYPE "public"."appointment_states" AS ENUM('pending', 'confirmed', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."prescription_states" AS ENUM('active', 'inactive', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."report_states" AS ENUM('pending', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_states" AS ENUM('pending', 'paid', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."machine_states" AS ENUM('active', 'inactive', 'under_maintenance', 'decommissioned', 'out_of_order');--> statement-breakpoint
CREATE TABLE "associates" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"specialty" varchar(255) NOT NULL,
	"salary" numeric(10, 2) NOT NULL,
	"credit_date" timestamp DEFAULT now() NOT NULL,
	"account" varchar(255) NOT NULL,
	"amount_owed" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" integer NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "user_roles_user_id_role_pk" PRIMARY KEY("user_id","role")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"password_hash" text,
	"email" varchar(255),
	"phone" varchar(15),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "allergies" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "allergy_includes" (
	"allergy" varchar(255) NOT NULL,
	"medication" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_illness" (
	"client_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"doctor_id" integer NOT NULL,
	"status" "illness_states" NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now(),
	CONSTRAINT "client_illness_client_id_name_doctor_id_pk" PRIMARY KEY("client_id","name","doctor_id")
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"client_id" integer PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"birth_date" date,
	"bloodType" "blood_types",
	"responsible" integer
);
--> statement-breakpoint
CREATE TABLE "has_allergy" (
	"appointment_id" integer,
	"client_id" integer,
	"allergy" varchar(255) NOT NULL,
	"reaction" text,
	"severity" "allergySeverity",
	"note" text,
	"discoveryDate" date
);
--> statement-breakpoint
CREATE TABLE "illnesses" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "medications" (
	"medication_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "medications_medication_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"medication" varchar(255) NOT NULL,
	"dosage" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"appointment_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointments_appointment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"client_id" integer,
	"associate_id" integer,
	"confirmed_by" integer,
	"reason" text,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"status" "appointment_states" NOT NULL,
	"bill_id" integer,
	"group_name" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prescriptions" (
	"appointment_id" integer NOT NULL,
	"medication_id" integer NOT NULL,
	"frequency" varchar(100) NOT NULL,
	"instructions" varchar(255),
	"start_date" date NOT NULL,
	"end_date" date,
	"status" "prescription_states" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "records" (
	"record_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "records_record_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"appointment_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"report_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reports_report_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"appointment_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"file_uri" text NOT NULL,
	"status" "report_states" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bill_reasons" (
	"bill_id" integer,
	"service_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bills" (
	"bill_id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "bills_bill_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"total" numeric,
	"date" timestamp,
	"status" "payment_states" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"expense_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "expenses_expense_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"amount" numeric,
	"category" varchar(50),
	"date" timestamp,
	"description" text,
	"payer_id" integer,
	"status" "payment_states" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "payments_payment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bill_id" integer,
	"amount" numeric,
	"date" timestamp DEFAULT now(),
	"method" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "services" (
	"service_id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "services_service_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"amount" numeric,
	"title" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "shares_bills" (
	"bill_id" integer,
	"user_id" integer NOT NULL,
	"amount" numeric,
	"status" "payment_states" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "charities" (
	"charity_id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "charities_charity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"purpose" text NOT NULL,
	"contact_info" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clinics" (
	"clinic_id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "clinics_clinic_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"room" text NOT NULL,
	"phone" varchar(15) NOT NULL,
	"owner_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "machine_donation" (
	"machine_id" integer NOT NULL,
	"charity_id" integer NOT NULL,
	"donated_share" numeric(5, 2) NOT NULL,
	CONSTRAINT "machine_donation_machine_id_charity_id_pk" PRIMARY KEY("machine_id","charity_id")
);
--> statement-breakpoint
CREATE TABLE "machines" (
	"machine_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "machines_machine_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"model" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"value" numeric(10, 2) NOT NULL,
	"manufacturer" text NOT NULL,
	"provider" text NOT NULL,
	"clinic_id" integer NOT NULL,
	"status" "machine_states" DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operates" (
	"associate_id" integer NOT NULL,
	"machine_id" integer NOT NULL,
	CONSTRAINT "operates_associate_id_machine_id_pk" PRIMARY KEY("associate_id","machine_id")
);
--> statement-breakpoint
CREATE TABLE "owns_machine" (
	"machine_id" integer NOT NULL,
	"investor_id" integer NOT NULL,
	"share" numeric(5, 2) NOT NULL,
	CONSTRAINT "owns_machine_machine_id_investor_id_pk" PRIMARY KEY("machine_id","investor_id")
);
--> statement-breakpoint
ALTER TABLE "associates" ADD CONSTRAINT "associates_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allergy_includes" ADD CONSTRAINT "allergy_includes_allergy_allergies_name_fk" FOREIGN KEY ("allergy") REFERENCES "public"."allergies"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_illness" ADD CONSTRAINT "client_illness_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_illness" ADD CONSTRAINT "client_illness_name_illnesses_name_fk" FOREIGN KEY ("name") REFERENCES "public"."illnesses"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_client_id_users_user_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_responsible_clients_client_id_fk" FOREIGN KEY ("responsible") REFERENCES "public"."clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "has_allergy" ADD CONSTRAINT "has_allergy_appointment_id_appointments_appointment_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("appointment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "has_allergy" ADD CONSTRAINT "has_allergy_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "has_allergy" ADD CONSTRAINT "has_allergy_allergy_allergies_name_fk" FOREIGN KEY ("allergy") REFERENCES "public"."allergies"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_associate_id_associates_user_id_fk" FOREIGN KEY ("associate_id") REFERENCES "public"."associates"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_confirmed_by_associates_user_id_fk" FOREIGN KEY ("confirmed_by") REFERENCES "public"."associates"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_bill_id_bills_bill_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("bill_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_appointment_id_appointments_appointment_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("appointment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_medication_id_medications_medication_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("medication_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_appointment_id_appointments_appointment_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("appointment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_appointment_id_appointments_appointment_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("appointment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bill_reasons" ADD CONSTRAINT "bill_reasons_bill_id_bills_bill_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("bill_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_payer_id_associates_user_id_fk" FOREIGN KEY ("payer_id") REFERENCES "public"."associates"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_bill_id_bills_bill_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("bill_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shares_bills" ADD CONSTRAINT "shares_bills_bill_id_bills_bill_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bills"("bill_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shares_bills" ADD CONSTRAINT "shares_bills_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;