import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../models/user.model";

// JWT Token payload interface
interface TokenPayload {
  id: string;
  role: UserRole;
  groupId: string;
}

/**
 * Generate JWT token
 * @param payload TokenPayload object containing user data
 * @param expiresIn Token expiration time (default: '30d')
 * @returns JWT token string
 */
export const generateToken = (
  payload: TokenPayload,
  expiresIn = "30d"
): string => {
  const secret = process.env.JWT_SECRET || "default_secret";
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

/**
 * Verify JWT token
 * @param token JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as TokenPayload;
  } catch (error) {
    return null;
  }
};
