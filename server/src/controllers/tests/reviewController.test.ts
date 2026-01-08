import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleReviewCode } from "../../controllers/reviewController";
import * as reviewService from "@/services/reviewService";
import { handleGetUserReviews } from "../../controllers/reviewController";
import * as userQuery from "@/queries/user/getUserId";
import * as reviewQuery from "@/queries/review/review";
import { Review } from "@/types/review";

vi.mock("@/services/reviewService", () => ({
  reviewRepo: vi.fn(),
}));

vi.mock("@/queries/user/getUserId", () => ({
  getUserId: vi.fn(),
  getUserPreference: vi.fn(),
}));

vi.mock("@/queries/review/review", () => ({
  getReviewsByUserId: vi.fn(),
  insertReview: vi.fn(),
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
    const req = {
      body: { repoUrl: "https://github.com/test/repo" },
      user: { id: 1 },
    };
    const res = makeRes();

    vi.spyOn(userQuery, "getUserPreference").mockResolvedValue({});

    const mockResult = { review: "OK", score: 88 };
    vi.spyOn(reviewService, "reviewRepo").mockResolvedValue(mockResult);

    await handleReviewCode(req as any, res as any);

    expect(reviewService.reviewRepo).toHaveBeenCalledWith({
      repoUrl: "https://github.com/test/repo",
      criteria: [],
      prefs: {},
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });
  it("should return 404 if repository not found", async () => {
    const req = {
      body: { repoUrl: "https://github.com/test/repo" },
      user: { id: 1 },
    };
    const res = makeRes();

    vi.spyOn(userQuery, "getUserPreference").mockResolvedValue({});
    vi.spyOn(reviewService, "reviewRepo").mockRejectedValue({ status: 404 });

    await handleReviewCode(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Repository not found or access denied",
    });
    expect(reviewQuery.insertReview).not.toHaveBeenCalled();
  });

  it("should return 413 if repository is too large", async () => {
    const req = {
      body: { repoUrl: "https://github.com/test/repo" },
      user: { id: 1 },
    };
    const res = makeRes();

    vi.spyOn(userQuery, "getUserPreference").mockResolvedValue({});
    vi.spyOn(reviewService, "reviewRepo").mockRejectedValue({
      message: "REPOSITORY_TOO_LARGE",
    });

    await handleReviewCode(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(413);
    expect(res.json).toHaveBeenCalledWith({
      message: "Repository is too large for automatic review",
    });
  });

  it("should return 404 if no supported files found", async () => {
    const req = {
      body: { repoUrl: "https://github.com/test/repo" },
      user: { id: 1 },
    };
    const res = makeRes();

    vi.spyOn(userQuery, "getUserPreference").mockResolvedValue({});
    vi.spyOn(reviewService, "reviewRepo").mockRejectedValue({
      message: "NO_FILES",
    });

    await handleReviewCode(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "No supported files found in repository",
    });
  });
});

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

    const mockReviews: Review[] = [
      {
        id: 1,
        userId: 1,
        repoId: 1,
        score: 90,
        createdAt: new Date(),
      },
    ];

    vi.spyOn(reviewQuery, "getReviewsByUserId").mockResolvedValue(mockReviews);

    await handleGetUserReviews(req as any, res as any);

    expect(userQuery.getUserId).toHaveBeenCalledWith("1");
    expect(reviewQuery.getReviewsByUserId).toHaveBeenCalledWith(1);

    expect(res.json).toHaveBeenCalledWith(mockReviews);
  });
});
