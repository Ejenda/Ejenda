CREATE TABLE IF NOT EXISTS "assignments" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" text NOT NULL,
	"created_at" integer NOT NULL,
	"tags" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"created_at" integer NOT NULL
);
