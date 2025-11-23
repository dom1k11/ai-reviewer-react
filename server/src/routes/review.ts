import { Router } from "express";

import { validateBody } from "@/middleware/validate";
import { PostURLSchema } from "@/validators/urlValidator";
import {
  handleGetReviewById,
  handleGetUserReviews,
  reviewCode,
} from "../controllers/controllers/reviewController";

const router = Router();

router.post("/", validateBody(PostURLSchema), reviewCode);
router.get("/", handleGetUserReviews); //Add validation
router.get("/:id", handleGetReviewById); //Add Validation

export default router;
