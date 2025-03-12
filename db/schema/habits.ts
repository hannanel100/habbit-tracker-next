import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  date,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Define the habits table
export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: uuid("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
});

// Define the habit entries (daily check-ins) table
export const habitEntries = pgTable("habit_entries", {
  id: serial("id").primaryKey(),
  habitId: serial("habit_id")
    .references(() => habits.id)
    .notNull(),
  userId: uuid("user_id").notNull(),
  date: date("date").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
