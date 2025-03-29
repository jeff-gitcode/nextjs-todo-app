import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

// Initialize the database
const db = new PGlite(); // Use ":memory:" for an in-memory database or a file path for persistence

// Connect Drizzle-ORM to the database
export const drizzleDb = drizzle(db);