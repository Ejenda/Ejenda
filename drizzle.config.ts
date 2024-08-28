import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: `postgres://postgres:example@${
      process.env.NODE_ENV != "production"
        ? "localhost:5555"
        : "localhost:5432"
    }/db`,
  },
});
