import {
  generateReview,
  extractScoreFromReview,
} from "@/services/openaiService";
import { getFileContent, filterExts } from "@/services/githubService";
import { parseRepoUrl } from "@/utils/getRepo";
export async function reviewRepo( repoUrl ) {
  try {
    const { owner, repo } = parseRepoUrl(repoUrl);

    const files = await filterExts(owner, repo);
    if (!files.length) throw new Error("NO_FILES");

    const codes = await Promise.all(
      files.map((f) => getFileContent(owner, repo, f.sha))
    );

    const full = codes.join("\n\n/* --- next file --- */\n\n");
    const review = await generateReview(full);
    const score = extractScoreFromReview(review) ?? 0;

    return { review, score };
  } catch (err) {
    throw new Error("Failed to process review");
  }
}
