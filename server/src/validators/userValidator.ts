import { z } from "zod";
import { AUTH0_CLAIMS } from '@/constants/auth0Claims';
export const createUserSchema = z.object({
  [AUTH0_CLAIMS.EMAIL]: z.string().email(),
  [AUTH0_CLAIMS.NICKNAME]: z.string(),
});

export const getUserSchema = z.object({
  sub: z.string().min(1, "sub is required"),
});
