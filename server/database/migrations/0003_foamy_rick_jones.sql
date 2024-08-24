CREATE TABLE IF NOT EXISTS "assignments_to_subjects" (
	"assignment_id" varchar(32),
	"subject_id" varchar(32)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"user_id" varchar(32),
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_subjects" (
	"user_id" varchar(32),
	"subject_id" varchar(32)
);
--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "due" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "subject_id" varchar(32);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "subjects" USING btree ("user_id");