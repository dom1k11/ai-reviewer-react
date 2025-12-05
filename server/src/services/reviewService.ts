import {
  generateReview,
  extractScoreFromReview,
} from "@/services/openaiService";
import { getFileContent, filterExts } from "@/services/githubService";
import { parseRepoUrl } from "@/utils/getRepo";
import { UserPreferences } from "@/types/UserPreferences";
export type ReviewRepoResult = {
  review: string;
  score: number;
};

export type ReviewRepoInput = {
  repoUrl: string;
  criteria: string[];
  prefs: UserPreferences;
};

export async function reviewRepo({
  repoUrl,
  criteria,
  prefs,
}: ReviewRepoInput): Promise<ReviewRepoResult> {
  try {
    const { owner, repo } = parseRepoUrl(repoUrl);

    const files = await filterExts(owner, repo);
    if (!files.length) throw new Error("NO_FILES");

    const codes = await Promise.all(
      files.map((f) => getFileContent(owner, repo, f.sha))
    );

    const full = codes.join("\n\n/* --- next file --- */\n\n");

    const review = await generateReview(full, criteria, prefs);

    const score = extractScoreFromReview(review) ?? 0;

    return { review, score };
  } catch {
    throw new Error("Failed to process review");
  }
}
