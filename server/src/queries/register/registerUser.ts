import { pool } from "@/db";
import { RegisterUserInput } from "../../types/user";
export async function registerUser(data: RegisterUserInput) {
  const {
    name,
    email,
    password_hash,
    specialization,
    experience,
    tone,
    style,
  } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const userInsert = `
      INSERT INTO users (name, email, password_hash, role, is_blocked)
      VALUES ($1, $2, $3, 'user', false)
      RETURNING *;
    `;
    const userResult = await client.query(userInsert, [
      name,
      email,
      password_hash,
    ]);
    const user = userResult.rows[0];

    const prefsInsert = `
      INSERT INTO user_preferences (user_id, specialization, experience, tone, style)
      VALUES ($1, $2, $3, $4, $5);
    `;
    await client.query(prefsInsert, [
      user.id,
      specialization,
      experience,
      tone,
      style,
    ]);

    await client.query("COMMIT");
    return user;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
