import { githubRequest } from "@/clients/githubClient";
export const GITHUB_ALLOWED_EXTS = process.env.GITHUB_ALLOWED_EXTS
  ? process.env.GITHUB_ALLOWED_EXTS.split(",")
  : [".ts", ".js"];
export async function getRepoTree(
  owner: string,
  repo: string,
  branch = "main"
): Promise<{ tree: { path: string; type: string; sha: string }[] }> {
  const request = await githubRequest("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
    owner,
    repo,
    tree_sha: branch,
    recursive: "1",
  });

  return request as { tree: { path: string; type: string; sha: string }[] };
}

type GitHubBlobResponse = { content?: string };

export async function getFileContent(
  owner: string,
  repo: string,
  fileSha: string
): Promise<string> {
  console.log("📄 [getFileContent] owner:", owner, "repo:", repo, "sha:", fileSha);

  try {
    const blob: GitHubBlobResponse = await githubRequest(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      { owner, repo, file_sha: fileSha }
    );

    if (!blob.content) {
      throw new Error(`[getFileContent] missing content for sha: ${fileSha}`);
    }

    return Buffer.from(blob.content, "base64").toString("utf8");
  } catch (err) {
    console.error("❌ Failed to fetch file content:", err);
    throw err;
  }
}

export async function filterExts(owner: string, repo: string) {
  try {
    const { tree } = await getRepoTree(owner, repo);

    const ALLOWED_EXTS = GITHUB_ALLOWED_EXTS;

    return tree
      .filter(
        (file: { path: string; type: string; sha: string }) =>
          file.type === "blob" &&
          ALLOWED_EXTS.some((ext) => file.path.endsWith(ext)) &&
          !file.path.includes("node_modules") &&
          !file.path.startsWith(".")
      )
      .map((file: { path: string; type: string; sha: string }) => ({
        sha: file.sha,
        path: file.path,
      }));
  } catch (err) {
    console.error("❌ Failed to filter files from repo tree:", err);
    throw new Error("Failed to filter allowed files");
  }
}
