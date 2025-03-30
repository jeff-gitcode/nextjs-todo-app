import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

// import { PGlite } from "@electric-sql/pglite";
// import { drizzle } from "drizzle-orm/pglite";
// import * as schema from "./schema";

// // Initialize the database
// const db = new PGlite(); // Use ":memory:" for an in-memory database or a file path for persistence

// // Connect Drizzle-ORM to the database
// export const drizzleDb = drizzle({ schema, client: db });

export const drizzleDb = drizzle(process.env.DATABASE_URL!);