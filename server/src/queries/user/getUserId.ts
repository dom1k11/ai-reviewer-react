import { pool } from "@/db";
export async function getUserId(user_id: string) {
  const result = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
  return result.rows[0] ?? null;
}
