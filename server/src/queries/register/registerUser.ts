import { pool } from "@/db";

export async function registerUser({ name, email, password_hash }) {
  const query = `
    INSERT INTO users (name, email, password_hash, role, is_blocked)
    VALUES ($1, $2, $3, 'user', false)
    RETURNING *;
  `;

  const params = [name, email, password_hash];

  const result = await pool.query(query, params);
  return result.rows[0];
}
