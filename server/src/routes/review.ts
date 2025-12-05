import { Router } from "express";

import { validateBody } from "@/middleware/validate";
import { PostURLSchema } from "@/validators/urlValidator";
import {
  // handleGetReviewById,
  handleGetUserReviews,
  handleReviewCode,
} from "../controllers/reviewController";
import { authMiddleware } from "@/middleware/authMiddleware";
const router = Router();

router.post("/", 
  authMiddleware,
  validateBody(PostURLSchema),
  handleReviewCode);
router.get("/:user_id", authMiddleware, handleGetUserReviews);

export default router;
