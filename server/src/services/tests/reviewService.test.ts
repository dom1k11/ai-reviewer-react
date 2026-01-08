import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { reviewRepo } from "@/services/reviewService";
import * as githubService from "@/services/githubService";
import * as openaiService from "@/services/openaiService";

vi.mock("@/utils/getRepo", () => ({
  parseRepoUrl: vi.fn().mockReturnValue({
    owner: "dom1k11",
    repo: "code-template",
  }),
}));

vi.mock("@/services/githubService", () => ({
  filterExts: vi.fn(),
  getFileContent: vi.fn(),
}));

vi.mock("@/services/openaiService", () => ({
  generateReview: vi.fn(),
  extractScoreFromReview: vi.fn(),
}));

describe("reviewAndStoreRepo", () => {
  const baseArgs = {
    repoUrl: "https://github.com/test/repo",
    criteria: [],
    prefs: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run full review process and insert review", async () => {
    (githubService.filterExts as Mock).mockResolvedValue([
      { sha: "sha1", path: "index.js" },
      { sha: "sha2", path: "App.vue" },
    ]);
    (githubService.getFileContent as Mock)
      .mockResolvedValueOnce("console.log('hi')")
      .mockResolvedValueOnce("export default {}");
    (openaiService.generateReview as Mock).mockResolvedValue(
      "Review\nScore: 85"
    );
    (openaiService.extractScoreFromReview as Mock).mockReturnValue(85);
    const result = await reviewRepo(baseArgs);

    expect(result).toEqual({
      review: "Review\nScore: 85",
      score: 85,
    });

    expect(githubService.filterExts).toHaveBeenCalled();
    expect(githubService.getFileContent).toHaveBeenCalledTimes(2);
    expect(openaiService.generateReview).toHaveBeenCalled();
  });

  it("should throw if no supported files", async () => {
    (githubService.filterExts as Mock).mockResolvedValue([]);

    await expect(reviewRepo(baseArgs)).rejects.toThrow(
       "NO_FILES"
    );
  });

  it("should throw if generateReview fails", async () => {
    (githubService.filterExts as Mock).mockResolvedValue([
      { sha: "sha1", path: "index.js" },
    ]);
    (githubService.getFileContent as Mock).mockResolvedValue("code");
    (openaiService.generateReview as Mock).mockRejectedValue(
      new Error("AI down")
    );

    await expect(reviewRepo(baseArgs)).rejects.toThrow(
       "AI down"
    );
  });
});
