import { registerUser } from '../queries/register/registerUser';
import { controller } from '../utils/controllerWrapper.js';
import { hashPassword } from '@/services/hashPassword';
export const handleRegister = controller(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const result = await registerUser({
    name,
    email,
    password_hash: hashedPassword,
  });

  res.json({
    message: 'User registered.',
    result,
  });
});
