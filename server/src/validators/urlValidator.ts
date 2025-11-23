import { z } from "zod";

const ownerRegex = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
const repoRegex = /^[A-Za-z0-9._-]{1,100}$/;

export const PostURLSchema = z.object({
  repoUrl: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => {
      try {
        const u = new URL(url);
        if (u.hostname !== "github.com") return false;
        const parts = u.pathname.split("/").filter(Boolean);
        if (parts.length < 2) return false;
        return ownerRegex.test(parts[0]) && repoRegex.test(parts[1]);
      } catch {
        return false;
      }
    }, "Invalid GitHub repo URL"),
});

export type URLInput = z.infer<typeof PostURLSchema>;
