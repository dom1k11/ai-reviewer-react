import { reviewRepo } from "@/services/reviewService";
import { controller } from "@/utils/controllerWrapper";
import { getReviewsByUserId, insertReview } from "@/queries/review/review";
import { getUserId, getUserPreference } from "@/queries/user/getUserId";

export const handleReviewCode = controller(async (req, res) => {
  const { repoUrl, criteria = [] } = req.body;

  try {
    const prefs = await getUserPreference(req.user.id);
    const result = await reviewRepo({
      repoUrl,
      criteria,
      prefs,
    });
    await insertReview(Number(req.user.id), result.score, result.review);
    res.status(201).json(result);

  } catch (err: any) {
    if (err.status === 404) {
      res.status(404).json({
        message: "Repository not found or access denied",
      });
      return;
    }

    if (err.message === "REPOSITORY_TOO_LARGE") {
      res.status(413).json({
        message: "Repository is too large for automatic review",
      });
    }

    if (err.message === "NO_FILES") {
      res.status(404).json({
        message: "No supported files found in repository",
      });
    }
    throw err;
  }
}, "handleReviewCode");

export const handleGetUserReviews = controller(async (req, res) => {
  const { user_id } = req.params;
  const userId = await getUserId(user_id);
  const reviews = await getReviewsByUserId(userId.id);
  res.json(reviews);
}, "handleGetUserReviews");
