import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todo", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
});

// Users table
export const users = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(), // Store hashed passwords
    created_at: text("created_at").default("NOW()"), // Optional: Add a timestamp
});

export type Todo = typeof todos.$inferSelect;
export type NewUser = typeof users.$inferInsert;