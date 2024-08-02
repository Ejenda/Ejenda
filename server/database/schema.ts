import { relations } from "drizzle-orm";
import { pgTable, text, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", {length:32}).primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: integer("created_at").notNull(),
});
export const userRelations = relations(users, ({ many }) => ({
  user: many(assignments),
}));

export const assignments = pgTable("assignments", {
  id: integer("id").primaryKey(),
  userId: varchar("id", {length:32}).primaryKey(),
  title: text("title").notNull(),
  createdAt: integer("created_at").notNull(),
  tags: text("tags").array(),
});
export const assignmentsRelations = relations(assignments, ({ one }) => ({
  user: one(users, {
    fields: [assignments.userId],
    references: [users.id],
  }),
}));
