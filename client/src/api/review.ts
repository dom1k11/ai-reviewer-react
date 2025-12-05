import { apiWrapper } from "../utils/apiWrapper";

export function getReview(repoUrl: string, criteria: string[]) {
  return apiWrapper("/review", {
    method: "POST",
    body: JSON.stringify({
      repoUrl,
      criteria,
    }),
  });
}

export function fetchReviews(user_id: number) {
  return apiWrapper(`/review/${user_id}`);
}
