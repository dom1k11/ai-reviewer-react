import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function generateToken(payload: {
  id: number;
  role: string | null;
  is_blocked: boolean | null;
  email?: string;
}) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}
