import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(3, 'Minimum 3 symbols'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(3, 'Minimum 3 symbols'),
});
