import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import { getRepoTree, getFileContent } from "../githubService";
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

    (githubRequest as Mock).mockResolvedValueOnce(mockResponse);

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

    await expect(
      getRepoTree("dom1k11", "code-template")
    ).rejects.toThrow("Failed to fetch repo tree");
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

    await expect(
      getFileContent("dom1k11", "code-template", "abc123")
    ).rejects.toThrow("[getFileContent] missing content for sha: abc123");
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
