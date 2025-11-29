import { describe, it, expect, afterEach } from "vitest";

import { createReviewRequest } from "@/services/openaiService";
import { MODEL, SYSTEM_PROMPT, USER_PROMPT, MAX_TOKENS } from "@/config/openai";
import { extractScoreFromReview } from "@/services/openaiService";
import { parseReviewResponse } from "@/services/openaiService";
import { vi } from "vitest";
import * as openaiClient from "@/clients/openaiClient";
import { generateReview } from "@/services/openaiService";

describe("createReviewRequest", () => {
  it("should create a valid request object", () => {
    const code = "const x = 5;";
    const result = createReviewRequest(code);

    expect(result).toEqual({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_PROMPT(code) },
      ],
    });
  });

  it("should include user code in the user message", () => {
    const code = "function test() {}";
    const result = createReviewRequest(code);

    const userMessage = result.messages.find((m) => m.role === "user");
    expect(userMessage?.content).toContain(code);
  });
});

describe("parseReviewResponse", () => {
  it("should return content if response is valid", () => {
    const data = { choices: [{ message: { content: "Good job!" } }] };
    expect(parseReviewResponse(data)).toBe("Good job!");
  });

  it("should return fallback if response is missing", () => {
    expect(parseReviewResponse({})).toBe("No Answer from OpenAI");
    expect(parseReviewResponse({ choices: [] })).toBe("No Answer from OpenAI");
    expect(parseReviewResponse({ choices: [{ message: {} }] })).toBe("No Answer from OpenAI");
  });
});

describe("extractScoreFromReview", () => {
  it("should extract numeric score from text", () => {
    const text = "Some feedback. Score: 85 Great job!";
    expect(extractScoreFromReview(text)).toBe(85);
  });

  it("should return null if score is missing", () => {
    expect(extractScoreFromReview("No score here")).toBeNull();
  });

  it("should extract only the first score if multiple", () => {
    const text = "Score: 75 but earlier it was Score: 50";
    expect(extractScoreFromReview(text)).toBe(75);
  });
});
import { mockReview } from "@/utils/reviewMock";
describe("generateReview", () => {
  const originalEnv = process.env.USE_MOCK_AI;

  afterEach(() => {
    process.env.USE_MOCK_AI = originalEnv;
  });

  it("should call OpenAI if USE_MOCK_AI is true", async () => {
    process.env.USE_MOCK_AI = "true";
    vi.spyOn(openaiClient, "callOpenAI").mockResolvedValueOnce({
      choices: [{ message: { content: mockReview } }],
    });

    const result = await generateReview("code");
    expect(result).toBe(mockReview);
  });
});
