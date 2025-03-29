import { pgTable } from "drizzle-orm/pg-core";
import { serial, text } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
});