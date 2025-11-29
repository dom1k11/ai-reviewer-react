import fs from "fs";
import path from "path";
import pg from "pg";

export async function runSeeds(connectionString: string) {
  const seedsDir = path.resolve("src", "db", "seeds");

  if (!fs.existsSync(seedsDir)) return;

  const pool = new pg.Pool({ connectionString });

  const files = fs
    .readdirSync(seedsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(seedsDir, file), "utf8");
    console.log(`▶ Running seed: ${file}`);
    await pool.query(sql);
  }

  await pool.end();
}
