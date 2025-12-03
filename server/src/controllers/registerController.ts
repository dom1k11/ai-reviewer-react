import { registerUser } from "../queries/register/registerUser";
import { controller } from "../utils/controllerWrapper.js";
import { hashPassword } from "@/utils/hashPassword";

export const handleRegister = controller(async (req, res) => {
  const { name, email, password, specialization, experience, tone, style } =
    req.body;

  const hashedPassword = await hashPassword(password);

  const result = await registerUser({
    name,
    email,
    password_hash: hashedPassword,
    specialization,
    experience,
    tone,
    style,
  });

  res.json({
    message: "User registered.",
    result,
  });
});
