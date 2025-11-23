import { reviewAndStoreRepo } from "@/services/reviewService";
import { getUserIdBySub } from "@/queries/users";
import { getReviewById, getReviewsByUserId } from "@/queries/review";
import { controller } from "@/utils/controllerWrapper";
export const reviewCode = controller(async (req, res) => {
  const { repoUrl } = req.body;
  const result = await reviewAndStoreRepo({ repoUrl });
  res.status(201).json(result);
}, "handlePostMessage");

export const handleGetUserReviews = controller(async (req, res) => {
  const sub = req.auth?.payload.sub;
  const userId = await getUserIdBySub(sub);
  const reviews = await getReviewsByUserId(userId.id);
  res.json(reviews);
}, "handleGetUserReviews");

export const handleGetReviewById = controller(async (req, res) => {
  const reviewId = Number(req.params.id);
  const review = await getReviewById(reviewId);
  res.json(review);
}, "handleGetReviewById");
