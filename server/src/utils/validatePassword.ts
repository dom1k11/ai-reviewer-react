import bcrypt from 'bcrypt';

export async function validatePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
