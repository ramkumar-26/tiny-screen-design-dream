import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User, { UserRole, IUser } from "../models/user.model";

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        groupId: string;
      };
    }
  }
}

// JWT payload interface
interface JwtPayload {
  id: string;
  role: UserRole;
  groupId: string;
}

// Authentication middleware
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default_secret"
      ) as JwtPayload;

      // Get user from token and cast to Document & IUser
      const userDoc = await User.findById(decoded.id).select("-password");

      if (!userDoc || !(userDoc as any).isActive) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, user not found or inactive",
        });
      }

      // Convert to regular object to safely access properties
      const user = userDoc.toObject() as IUser;

      // Set user in request
      req.user = {
        id: user._id.toString(),
        role: user.role,
        groupId: user.groupId.toString(),
      };

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

// Role-based access control middleware factory
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Group access middleware
export const checkGroupAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  // If group ID is in params, check if user belongs to that group
  if (req.params.groupId && req.params.groupId !== req.user.groupId) {
    return res.status(403).json({
      success: false,
      message: "Not authorized to access this group",
    });
  }

  next();
};
