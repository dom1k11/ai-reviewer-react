import { apiWrapper } from "../utils/apiWrapper";

export function getReview(repoUrl: string) {
  return apiWrapper("/review", {
    method: "POST",
    body: JSON.stringify({ repoUrl }),
  });
}
