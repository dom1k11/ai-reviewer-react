import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runSeeds() {
  const seedsDir = path.resolve("src", "db", "seeds");
  const files = fs
    .readdirSync(seedsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(seedsDir, file), "utf8");
    console.log(`▶ Running seed: ${file}`);
    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`❌ Failed on ${file}:`, err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  }

  await pool.end();
  console.log("✅ Seeds completed.");
}

runSeeds();
