import dotenv from "dotenv";
import { runMigrations } from "../src/db/migrations/migrate";
import { runSeeds } from "../src/db/seeds/seed";
import pg from "pg";

dotenv.config({ path: ".env.test" });

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function cleanTables() {
  const tables = ["reviews", "users"];
  for (const t of tables) {
    await pool.query(`TRUNCATE TABLE ${t} RESTART IDENTITY CASCADE;`);
  }
}

beforeAll(async () => {
  await runMigrations(process.env.DATABASE_URL!);
  await runSeeds(process.env.DATABASE_URL!);
});

beforeEach(async () => {
  await cleanTables();
});

afterAll(async () => {
  await pool.end();
});
