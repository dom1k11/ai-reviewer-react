import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

export const API_KEY = process.env.OPENAI_API_KEY;

export const MODEL = process.env.OPENAI_MODEL;
export const OPENAI_URL = process.env.OPENAI_URL!;
export const MAX_TOKENS = Number(process.env.OPENAI_MAX_TOKENS);

export const SYSTEM_PROMPT = (criteria: string[]) => `
${fs.readFileSync(path.join(__dirname, "systemPrompt.md"), "utf-8")}Focus ONLY on the following criteria:${criteria.map((c) => `- ${c}`).join("\n")}`;

export const USER_PROMPT = (code: string, criteria: string[]) => `Analyze this code with focus on:${criteria.map((c) => `- ${c}`).join("\n")}Code:${code}`
