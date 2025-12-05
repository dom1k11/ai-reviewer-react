import { reviewRepo } from "@/services/reviewService";
import { controller } from "@/utils/controllerWrapper";
import { getReviewsByUserId, insertReview } from "@/queries/review/review";
import { getUserId, getUserPreference } from "@/queries/user/getUserId";

export const handleReviewCode = controller(async (req, res) => {
  const { repoUrl, criteria = [] } = req.body;

  const prefs = await getUserPreference(req.user.id);
  const result = await reviewRepo({
    repoUrl,
    criteria,
    prefs,
  });
  await insertReview(Number(req.user.id), result.score, result.review);
  res.status(201).json(result);
}, "handleReviewCode");

export const handleGetUserReviews = controller(async (req, res) => {
  const { user_id } = req.params;
  const userId = await getUserId(user_id);
  const reviews = await getReviewsByUserId(userId.id);
  res.json(reviews);
}, "handleGetUserReviews");
