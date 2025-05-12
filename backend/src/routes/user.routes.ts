import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";

const router = express.Router();

// Protected routes
router.use(protect);

// These are placeholder routes - you can implement the controllers later
router.get("/", authorize(UserRole.LEADER, UserRole.SECRETARY), (req, res) => {
  res.status(200).json({
    success: true,
    message: "User routes are working",
    data: [],
  });
});

export default router;
