import { Router } from 'express';
import { handleLogin } from '@/controllers/loginController';
import { handleRegister } from '@/controllers/registerController';
import { validate } from '@/middleware/validateMiddleware';
import { loginSchema, registerSchema } from '@/validators/authSchemas';
const router = Router();

router.post('/register', validate(registerSchema), handleRegister);
router.post('/login', validate(loginSchema), handleLogin);
export default router;
