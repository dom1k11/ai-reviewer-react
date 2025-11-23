import { findOrCreateUser, getAverageScore, getUserBySub, getUserIdBySub } from "@/queries/users";
import type { User } from "@/types/user";
import { AuthPayload } from "@/types/authPayload";
import { controller } from "@/utils/controllerWrapper";
import { AUTH0_CLAIMS } from "@/constants/auth0Claims";
export const syncUserWithDatabase = controller(async (req, res) => {
  const {
    sub,
    [AUTH0_CLAIMS.EMAIL]: email,
    [AUTH0_CLAIMS.NICKNAME]: nickname,
  } = (req.auth?.payload ?? {}) as AuthPayload;
  console.log(sub, email, nickname);

  if (!sub || !email || !nickname) {
    res.status(400).json({ error: "Missing user claims" });
    return;
  }

  const user: User = await findOrCreateUser(sub, email, nickname);
  res.json(user);
}, "syncUserWithDatabase");

export const handleGetUser = controller(async (req, res) => {
  const sub = (req.auth?.payload as { sub?: string })?.sub;

  if (!sub) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user: User | null = await getUserBySub(sub);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
}, "handleGetUser");

export const handleGetAverageScore = controller(async (req, res) => {
  const sub = (req.auth?.payload as { sub?: string })?.sub;

  if (!sub) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = await getUserIdBySub(sub);
  if (!userId) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const averageScore = await getAverageScore(userId.id);
  console.log(averageScore);
  res.json({ averageScore });
  return;
}, "handleGetUser");
