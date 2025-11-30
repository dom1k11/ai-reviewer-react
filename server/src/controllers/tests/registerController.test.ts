import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleRegister } from "../../controllers/registerController"; // поправь путь
import * as register from "@/queries/register/registerUser";
import * as hash from "@/utils/hashPassword";

vi.mock("@/queries/register/registerUser", () => ({
  registerUser: vi.fn(),
}));

vi.mock("@/utils/hashPassword", () => ({
  hashPassword: vi.fn(),
}));

describe("handleRegister", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const makeRes = () => ({
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  });

  it("should hash password, register user and return result", async () => {
    const req = {
      body: {
        name: "John",
        email: "test@mail.com",
        password: "1234",
      },
    };
    const res = makeRes();
    vi.spyOn(hash, "hashPassword").mockResolvedValue("HASHED_PASSWORD");
    vi.spyOn(register, "registerUser").mockResolvedValue({
      id: 1,
      name: "John",
      email: "test@mail.com",
      role: "user",
    });
    await handleRegister(req as any, res as any);
    expect(hash.hashPassword).toHaveBeenCalledWith("1234");
    expect(register.registerUser).toHaveBeenCalledWith({
      name: "John",
      email: "test@mail.com",
      password_hash: "HASHED_PASSWORD",
    });

    expect(res.json).toHaveBeenCalledWith({
      message: "User registered.",
      result: {
        id: 1,
        name: "John",
        email: "test@mail.com",
        role: "user",
      },
    });
  });
});
