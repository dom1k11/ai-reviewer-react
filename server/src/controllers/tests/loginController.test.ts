import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleLogin } from "../../controllers/loginController";
import * as findUser from "@/queries/login/findUserByEmail";
import * as passwordUtils from "@/utils/validatePassword";
import * as jwt from "@/utils/jwtGenerator";

vi.mock("@/queries/login/findUserByEmail", () => ({
  findUserByEmail: vi.fn(),
}));

vi.mock("@/utils/validatePassword", () => ({
  validatePassword: vi.fn(),
}));

vi.mock("@/utils/jwtGenerator", () => ({
  generateToken: vi.fn(),
}));

describe("handleLogin", () => {
  beforeEach(() => vi.clearAllMocks());

  const makeRes = () => ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });

  it("should return 400 if user not found", async () => {
    const req = { body: { email: "test@mail.com", password: "1234" } };
    const res = makeRes();

    vi.spyOn(findUser, "findUserByEmail").mockResolvedValue(null);

    await handleLogin(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 401 if password is invalid", async () => {
    const req = { body: { email: "test@mail.com", password: "wrong" } };
    const res = makeRes();

    vi.spyOn(findUser, "findUserByEmail").mockResolvedValue({
      id: 1,
      email: "test@mail.com",
      password_hash: "hashed",
      role: "user",
      is_blocked: false,
    });

    vi.spyOn(passwordUtils, "validatePassword").mockResolvedValue(false);

    await handleLogin(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  it("should return 403 if user is blocked", async () => {
    const req = { body: { email: "test@mail.com", password: "1234" } };
    const res = makeRes();

    vi.spyOn(findUser, "findUserByEmail").mockResolvedValue({
      id: 1,
      email: "test@mail.com",
      password_hash: "hashed",
      role: "user",
      is_blocked: true,
    });

    vi.spyOn(passwordUtils, "validatePassword").mockResolvedValue(true);

    await handleLogin(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "User is blocked" });
  });

  it("should return token and message on success", async () => {
    const req = { body: { email: "test@mail.com", password: "1234" } };
    const res = makeRes();

    vi.spyOn(findUser, "findUserByEmail").mockResolvedValue({
      id: 1,
      email: "test@mail.com",
      password_hash: "hashed",
      role: "user",
      is_blocked: false,
    });

    vi.spyOn(passwordUtils, "validatePassword").mockResolvedValue(true);
    vi.spyOn(jwt, "generateToken").mockReturnValue("TOKEN123");

    await handleLogin(req as any, res as any);

    expect(res.json).toHaveBeenCalledWith({
      message: "User logged in.",
      token: "TOKEN123",
    });
  });
});
