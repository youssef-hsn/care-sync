import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("[DB] Connecting to: " + process.env.DATABASE_URL?.split('@')[1]);

export const db = drizzle(pool);