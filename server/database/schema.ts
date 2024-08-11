import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createSession, useKSUID } from "../utils/drizzle";
export const users = pgTable("users", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: text("name").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const userRelations = relations(users, ({ many }) => ({
  user: many(assignments),
}));

export const assignments = pgTable(
  "assignments",
  {
    id: varchar("id", { length: 32 })
      .primaryKey()
      .$defaultFn(() => useKSUID("assn")),
    userId: varchar("user_id", { length: 32 }),
    title: text("title").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tags: text("tags").array(),
    due: timestamp("due", { withTimezone: true }),
    subjectId: varchar("subject_id", { length: 32 }),
  },
  (table) => {
    return {
      assignmentUserIdIdx: index("assignment_user_id_idx").on(table.userId),
      subjectIdIdx: index("subject_id_idx").on(table.subjectId),
    };
  }
);

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  user: one(users, {
    fields: [assignments.userId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [assignments.subjectId],
    references: [subjects.id],
  }),
}));

export const session = pgTable("session", {
  id: varchar("id", { length: 37 })
    .primaryKey()
    .$defaultFn(() => createSession()),
  userId: varchar("user_id", { length: 32 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const subjects = pgTable(
  "subjects",
  {
    userId: varchar("user_id", { length: 32 }),
    id: varchar("id", { length: 32 })
      .primaryKey()
      .$defaultFn(() => useKSUID("subj")),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  }
);

export const subjectRelations = relations(subjects, ({ one, many }) => ({
  user: one(users, {
    fields: [subjects.userId],
    references: [users.id],
  }),
  assignments: many(assignments),
}));
