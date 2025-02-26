import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as importedSchema from "./schema";

// Load environment variables first
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in .env.local");
}

// Configure SSL for Supabase
const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
});

export const schema = importedSchema;
export const db = drizzle(sql, { schema });