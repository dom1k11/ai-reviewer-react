import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function runSeeds() {
  if (process.env.NODE_ENV === "test") {
    console.log("⏭ Skipping seeds in test mode");
    return;
  }

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
      console.error(
        `❌ Failed on ${file}:`,
        err instanceof Error ? err.message : String(err)
      );

      if (process.env.NODE_ENV !== "test") {
        process.exit(1);
      } else {
        throw err;
      }
    }
  }

  await pool.end();
  console.log("✅ Seeds completed.");
}

if (process.argv[1] && process.argv[1].includes("seed.ts")) {
  runSeeds();
}
