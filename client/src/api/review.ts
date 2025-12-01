import { apiWrapper } from "../utils/apiWrapper";

export function getReview(repoUrl: string) {
  return apiWrapper("/review", {
    method: "POST",
    body: JSON.stringify({ repoUrl }),
  });
}


export function fetchReviews(user_id: number) {
  return apiWrapper(`/review/${user_id}`);
}

