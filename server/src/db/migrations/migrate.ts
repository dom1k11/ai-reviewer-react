import fs from "fs";
import path from "path";
import pg from "pg";

export async function runMigrations(connectionString: string) {
  const pool = new pg.Pool({ connectionString });

  const migrationsDir = path.resolve("src", "db", "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`▶ Running migration: ${file}`);
    await pool.query(sql);
  }

  await pool.end();
}
