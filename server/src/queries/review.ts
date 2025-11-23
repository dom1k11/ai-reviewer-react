import { Review } from "@/types/review";
import pool from "../db";

export async function insertReview(userId: number, repoId: number, score: number): Promise<Review> {
  const result = await pool.query(
    "INSERT INTO reviews (user_id, repo_id, score) VALUES ($1, $2, $3) RETURNING *",
    [userId, repoId, score]
  );
  console.log(result.rows[0]);
  return result.rows[0];
}

export async function getReviewsByUserId(userId: number): Promise<Review[]> {
  const result = await pool.query(
    "SELECT id, repo_id, score, created_at FROM reviews WHERE user_id = $1",
    [userId]
  );
  return result.rows as Review[];
}

export async function getReviewById(reviewId: number): Promise<Review> {
  {
    const result = await pool.query(
      "SELECT id, repo_id, score, created_at from reviews WHERE id = $1",
      [reviewId]
    );
    return result.rows[0];
  }
}
