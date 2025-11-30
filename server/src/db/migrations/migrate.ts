import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

async function runMigrations() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const migrationsDir = path.resolve("src", "db", "migrations");

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`▶ Running migration: ${file}`);

    await pool.query(sql).catch((err) => {
      console.error(`❌ Failed on ${file}:`, err.message);
      throw err;
    });
  }

  await pool.end();
  console.log("✅ Migrations completed.");
}

runMigrations().catch((err) => {
  console.error("Migration error:", err);
});
