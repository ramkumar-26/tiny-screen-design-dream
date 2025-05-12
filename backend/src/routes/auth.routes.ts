import express from "express";
import {
  registerLeader,
  registerMember,
  login,
  getMe,
  updateProfile,
} from "../controllers/auth.controller";
import { protect, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";

const router = express.Router();

// Public routes
router.post("/register-leader", registerLeader);
router.post("/login", login);

// Protected routes
router.use(protect);
router.get("/me", getMe);
router.put("/profile", updateProfile);

// Leader/Secretary only routes
router.post(
  "/register-member",
  authorize(UserRole.LEADER, UserRole.SECRETARY),
  registerMember
);

export default router;
