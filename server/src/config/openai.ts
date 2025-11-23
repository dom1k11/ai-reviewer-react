import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

export const API_KEY = process.env.OPENAI_API_KEY;

export const MODEL = process.env.OPENAI_MODEL;
export const OPENAI_URL = process.env.OPENAI_URL!;
export const MAX_TOKENS = Number(process.env.OPENAI_MAX_TOKENS);

export const SYSTEM_PROMPT = fs.readFileSync(path.join(__dirname, "systemPrompt.md"), "utf-8");

export const USER_PROMPT = (code: string) => `Please review the following code:\n\n${code}`;
