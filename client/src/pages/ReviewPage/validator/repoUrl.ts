export function validateRepoUrlClient(url: string): string | null {
  if (!url.trim()) {
    return "Repository URL is required";
  }

  if (!url.startsWith("https://github.com/")) {
    return "Only GitHub repositories are supported";
  }

  const path = url.replace("https://github.com/", "");
  const parts = path.split("/").filter(Boolean);

  if (parts.length !== 2) {
    return "Repository URL must be in format github.com/owner/repo";
  }

  const [owner, repo] = parts;

  if (!owner || !repo) {
    return "Repository URL must be in format github.com/owner/repo";
  }

  return null;
}
