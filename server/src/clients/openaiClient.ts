import { OPENAI_URL, API_KEY } from "@/config/openai";

export async function callOpenAI(body: object) {
  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenAI API Error:", errorText);
      throw new Error("Failed to get OpenAI response");
    }

    return res.json();
  } catch (err) {
    console.error("❌ OpenAI request failed:", err);
    throw new Error("Failed to call OpenAI API");
  }
}
