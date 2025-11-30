import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleReviewCode } from "../../controllers/reviewController";
import * as reviewService from "@/services/reviewService";
import { handleGetUserReviews } from "../../controllers/reviewController";
import * as userQuery from "@/queries/user/getUserId";
import * as reviewQuery from "@/queries/review/review";

vi.mock("@/services/reviewService", () => ({
  reviewRepo: vi.fn(),
}));

describe("handleReviewCode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const makeRes = () => ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });

  it("should call reviewRepo and return 201 with result", async () => {
    const req = { body: { repoUrl: "https://github.com/test/repo" } };
    const res = makeRes();

    const mockResult = { review: "OK", score: 88 };
    vi.spyOn(reviewService, "reviewRepo").mockResolvedValue(mockResult);

    await handleReviewCode(req as any, res as any);

    expect(reviewService.reviewRepo).toHaveBeenCalledWith(
      "https://github.com/test/repo"
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });
});

vi.mock("@/queries/user/getUserId", () => ({
  getUserId: vi.fn(),
}));

vi.mock("@/queries/review/review", () => ({
  getReviewsByUserId: vi.fn(),
  insertReview: vi.fn(),
}));

describe("handleGetUserReviews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const makeRes = () => ({
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  });

  it("should return reviews of the user", async () => {
    const req = { params: { user_id: "1" } };
    const res = makeRes();

    vi.spyOn(userQuery, "getUserId").mockResolvedValue({ id: 1 });

    const mockReviews = [
      { user_id: 1, review: "Nice", score: 90 },
      { user_id: 1, review: "Ok", score: 75 },
    ];

    vi.spyOn(reviewQuery, "getReviewsByUserId").mockResolvedValue(mockReviews);

    await handleGetUserReviews(req as any, res as any);

    expect(userQuery.getUserId).toHaveBeenCalledWith("1");
    expect(reviewQuery.getReviewsByUserId).toHaveBeenCalledWith(1);

    expect(res.json).toHaveBeenCalledWith(mockReviews);
  });
});
