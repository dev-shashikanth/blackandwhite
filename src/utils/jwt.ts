// utils/jwt.ts
import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
};
