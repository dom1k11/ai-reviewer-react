import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import { getRepoTree, getFileContent, getDefaultBranch, filterExts } from "../githubService";
import { githubRequest } from "@/clients/githubClient";

vi.mock("@/clients/githubClient", () => ({
  githubRequest: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getRepoTree", () => {
  it("should return repo tree if request is succesful", async () => {
    const mockResponse = {
      tree: [
        { path: "index.js", sha: "12345", type: "blob" },
        { path: "app.ts", sha: "67890", type: "blob" },
      ],
    };

    (githubRequest as Mock)
      .mockResolvedValueOnce({ default_branch: "main" })
      .mockResolvedValueOnce(mockResponse);

    const result = await getRepoTree("dom1k11", "code-template");

    expect(result).toEqual(mockResponse);
    expect(githubRequest).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
      {
        owner: "dom1k11",
        repo: "code-template",
        tree_sha: "main",
        recursive: "1",
      }
    );
  });

  it("should throw and error if service is failed", async () => {
    (githubRequest as Mock).mockRejectedValueOnce(
      new Error("Failed to fetch repo tree")
    );

    await expect(getRepoTree("dom1k11", "code-template")).rejects.toThrow(
      "Failed to fetch repo tree"
    );
  });
});
describe("getFileContent", () => {
  it("should return decoded content from github parsed files", async () => {
    const mockBase64 = Buffer.from("console.log('hello');", "utf8").toString(
      "base64"
    );
    const mockResponse = { content: mockBase64 };

    (githubRequest as Mock).mockResolvedValueOnce(mockResponse);

    const result = await getFileContent("dom1k11", "code-template", "12345");

    expect(result).toBe("console.log('hello');");
    expect(githubRequest).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      {
        owner: "dom1k11",
        repo: "code-template",
        file_sha: "12345",
      }
    );
  });

  it("should throw and error if content is not present", async () => {
    (githubRequest as Mock).mockResolvedValueOnce({});

    const result = await getFileContent("dom1k11", "code-template", "abc123");
    expect(result).toBe("");
  });

  it("should throw and error if service is failed", async () => {
    (githubRequest as Mock).mockRejectedValueOnce(
      new Error("Failed to fetch file content")
    );

    await expect(
      getFileContent("dom1k11", "code-template", "failSha")
    ).rejects.toThrow("Failed to fetch file content");
  });
});
describe("getDefaultBranch", () => {
  it("should return default branch from github repo response", async () => {
    (githubRequest as Mock).mockResolvedValueOnce({
      default_branch: "main",
    });

    const result = await getDefaultBranch("dom1k11", "code-template");

    expect(result).toBe("main");

    expect(githubRequest).toHaveBeenCalledWith(
      "GET /repos/{owner}/{repo}",
      {
        owner: "dom1k11",
        repo: "code-template",
      }
    );
  });

  it("should throw error if github request fails", async () => {
    (githubRequest as Mock).mockRejectedValueOnce(
      new Error("Failed to fetch repo")
    );

    await expect(
      getDefaultBranch("dom1k11", "code-template")
    ).rejects.toThrow("Failed to fetch repo");
  });
});

vi.mock("@/clients/githubClient", () => ({
  githubRequest: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("filterExts", () => {
  it("should filter repo tree by allowed extensions and rules", async () => {
    (githubRequest as Mock).mockResolvedValueOnce({
      default_branch: "main",
    });
    (githubRequest as Mock).mockResolvedValueOnce({
      tree: [
        { path: "index.js", sha: "1", type: "blob" },             
        { path: "app.ts", sha: "2", type: "blob" },               
        { path: "readme.md", sha: "3", type: "blob" },             
        { path: "node_modules/lib.js", sha: "4", type: "blob" },    
        { path: ".env", sha: "5", type: "blob" },                 
        { path: "src", sha: "6", type: "tree" },                   
      ],
    });

    const result = await filterExts("dom1k11", "code-template");

    expect(result).toEqual([
      { path: "index.js", sha: "1" },
      { path: "app.ts", sha: "2" },
    ]);
  });

  it("should throw error if repo tree request fails", async () => {
    (githubRequest as Mock).mockResolvedValueOnce({
      default_branch: "main",
    });

    (githubRequest as Mock).mockRejectedValueOnce(
      new Error("Repo tree failed")
    );

    await expect(
      filterExts("dom1k11", "code-template")
    ).rejects.toThrow("Repo tree failed");
  });
});
