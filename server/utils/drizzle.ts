import { drizzle } from "drizzle-orm/postgres-js";
export { sql, eq, and, or, like } from "drizzle-orm";
import * as schema from "../database/schema";
import { randomBytes } from "crypto";
import postgres from "postgres";
import KSUID from "ksuid";

const queryClient = postgres(
  `postgres://postgres:example@${
    process.env.PRODUCTION ? "localhost:5555" : "db:5432"
  }/db`
);

export const tables = schema;

export function useDrizzle() {
  return drizzle(queryClient, { schema });
}

export type User = typeof schema.users.$inferSelect;
export type Assignment = typeof schema.assignments.$inferSelect;

type KeyPrefix = "user" | "assn" | "subj";
export function useKSUID(keyPrefix: KeyPrefix) {
  return keyPrefix + "_" + KSUID.randomSync().string;
}

export function createSession() {
  return "sess_" + randomBytes(16).toString("hex");
}
