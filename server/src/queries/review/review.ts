import { Review } from "@/types/review";
import { pool } from "@/db";
export async function insertReview(user_id: number,  score: number, review: string): Promise<Review> {
  const result = await pool.query(
    "INSERT INTO reviews (user_id, score, review) VALUES ($1, $2, $3) RETURNING *",
    [user_id, score, review]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

export async function getReviewsByUserId(userId: number): Promise<Review[]> {
  const result = await pool.query(
    "SELECT user_id, review, score FROM reviews WHERE user_id = $1",
    [userId]
  );
  return result.rows as Review[];
}

