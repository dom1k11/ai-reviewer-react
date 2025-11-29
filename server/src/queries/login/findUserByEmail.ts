import { pool } from "@/db";

export async function findUserByEmail(email: string) {
  const query = `
    SELECT 
      id,
      name,
      email,
      password_hash,
      role,
      is_blocked
    FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
}
