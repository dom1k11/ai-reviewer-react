  import { SYSTEM_PROMPT, USER_PROMPT, MODEL, MAX_TOKENS } from "@/config/openai";
  import { callOpenAI } from "@/clients/openaiClient";
  export function createReviewRequest(code: string, criteria: string[]) {
    return {
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT(criteria) },
        { role: "user", content: USER_PROMPT(code, criteria) },
      ],
      max_tokens: MAX_TOKENS,
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function parseReviewResponse(data: any): string {
    return data.choices?.[0]?.message?.content ?? "No Answer from OpenAI";
  }
  import { mockReview } from "../utils/reviewMock";
  export async function generateReview(code: string, criteria: string[]) {
    if (process.env.USE_MOCK_AI === "true") {
      console.log("⚠️ Using mock AI");
      return mockReview;
    }
    const request = createReviewRequest(code, criteria);
    const data = await callOpenAI(request);
    return parseReviewResponse(data);
  }

  export function extractScoreFromReview(text: string): number | null {
    const match = text.match(/Score:\s*(\d{1,3})/);
    return match ? parseInt(match[1], 10) : null;
  }
