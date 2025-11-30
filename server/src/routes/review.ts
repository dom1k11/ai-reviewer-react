import { Router } from "express";

import { validateBody } from "@/middleware/validate";
import { PostURLSchema } from "@/validators/urlValidator";
import {
  // handleGetReviewById,
  handleGetUserReviews,
  handleReviewCode,
} from "../controllers/reviewController";

const router = Router();

router.post("/", validateBody(PostURLSchema), handleReviewCode);
router.get("/:user_id", handleGetUserReviews); //Add validation
// router.get("/:id", handleGetReviewById); //Add Validation

export default router;
