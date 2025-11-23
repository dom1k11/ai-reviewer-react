import {
  generateReview,
  extractScoreFromReview,
} from "@/services/openaiService";
import { getFileContent, filterExts } from "@/services/githubService";
import { parseRepoUrl } from "@/utils/getRepo";
export async function reviewAndStoreRepo({ repoUrl }: { repoUrl: string }) {
  const { owner, repo } = parseRepoUrl(repoUrl);
  const files = await filterExts(owner, repo);
  if (files.length === 0) {
    throw new Error(`No supported files found in ${owner}/${repo}`);
  }

  const codes = await Promise.all(
    files.map(({ sha }: { sha: string }) => getFileContent(owner, repo, sha))
  );

  const fullCode = codes.join("\n\n/* --- next file --- */\n\n");
  const review = await generateReview(fullCode);
  const score = extractScoreFromReview(review) ?? 0;
  return { review, score };
}
