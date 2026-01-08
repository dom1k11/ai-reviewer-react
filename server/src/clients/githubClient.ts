export async function githubRequest<T = unknown>(
  endpoint: string,
  params: object
): Promise<T> {
  try {
    const { Octokit } = await eval("import('@octokit/core')");

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const res = await octokit.request(endpoint, {
      ...params,
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    });

    return res.data as T;
  } catch (err: unknown) {
    console.error("❌ GitHub request failed:", err);

    if (
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      "message" in err
    ) {
      throw {
        status: (err as { status: number }).status,
        message: (err as { message: string }).message,
      };
    }

    throw err;
  }
}
