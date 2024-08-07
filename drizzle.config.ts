import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: `postgres://postgres:example@${
      !process.env.PRODUCTION ? "localhost:5555" : "db:5432"
    }/db`,
  },
});
