import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todo", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
});

export type Todo = typeof todos.$inferSelect;