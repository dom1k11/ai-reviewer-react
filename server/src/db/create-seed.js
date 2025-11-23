import fs from "fs";
import path from "path";

const name = process.argv[2];
if (!name) {
  console.error("❌ Please provide a seed name.");
  process.exit(1);
}

function getTimestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  const yyyy = now.getFullYear();
  const MM = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  return `${yyyy}${MM}${dd}T${hh}${mm}${ss}`;
}

const timestamp = getTimestamp();
const fileName = `${timestamp}_${name}.sql`;

const seedsDir = path.resolve("src", "db", "seeds");
const filePath = path.join(seedsDir, fileName);

fs.mkdirSync(seedsDir, { recursive: true });
fs.writeFileSync(filePath, "-- SQL seed\n");

console.log(`✅ Created: seeds/${fileName}`);
