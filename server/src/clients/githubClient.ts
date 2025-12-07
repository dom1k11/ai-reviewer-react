export async function githubRequest<T = unknown>(
  endpoint: string,
  params: object
): Promise<T> {
  try {
    const { Octokit } = await import("@octokit/core");

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const res = await octokit.request(endpoint, {
      ...params,
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    });

    return res.data as T;
  } catch (err) {
    console.error("❌ GitHub request failed:", err);
    throw new Error("GitHub API request failed");
  }
}
