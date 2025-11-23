import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  const migrationsDir = path.resolve("src", "db", "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`▶ Running migration: ${file}`);
    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`❌ Failed on ${file}:`, err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  }

  await pool.end();
  console.log("✅ Migrations completed.");
}

runMigrations();
