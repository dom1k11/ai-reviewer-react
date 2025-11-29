import { controller } from '../utils/controllerWrapper';
import { findUserByEmail } from '../queries/login/findUserByEmail';

import { validatePassword } from '../services/validatePassword';
import { generateToken } from '../services/jwtService';

export const handleLogin = controller(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ error: 'User not found' });
    return;
  }

  if (!(await validatePassword(password, user.password_hash))) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }
  if (user.is_blocked) {
    res.status(403).json({ error: 'User is blocked' });
    return;
  }
  const token = generateToken({
    id: user.id,
    role: user.role,
    is_blocked: user.is_blocked,
    email: user.email,
  });

  res.json({
    message: 'User logged in.',
    token: token,
  });
});
