import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type TokenPayload = JwtPayload & {
  id: string;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = { id: decoded.id };

    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
