import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function githubRequest<T = unknown>(endpoint: string, params: object): Promise<T> {
  try {
    const res = await octokit.request(endpoint, {
      ...params,
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    });
    return res.data;
  } catch (err) {
    console.error("❌ GitHub request failed:", err);
    throw new Error("GitHub API request failed");
  }
}
