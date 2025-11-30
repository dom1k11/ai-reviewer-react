import { reviewRepo } from "@/services/reviewService";
import { controller } from "@/utils/controllerWrapper";
import { getReviewsByUserId, insertReview } from "@/queries/review/review";
import { getUserId } from "@/queries/user/getUserId";
export const handleReviewCode = controller(async (req, res) => {
  const { repoUrl } = req.body;
  const result = await reviewRepo( repoUrl );
  console.log(result)
  insertReview(1, result.score, result.review) //TODO add user_id to req.body
  res.status(201).json(result);
}, "handleReviewCode");

export const handleGetUserReviews = controller(async (req, res) => {
  const { user_id } = req.params;
  const userId = await getUserId(user_id);
  const reviews = await getReviewsByUserId(userId.id);
  res.json(reviews);
}, "handleGetUserReviews");
