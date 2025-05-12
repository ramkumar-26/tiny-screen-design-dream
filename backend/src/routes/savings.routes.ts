import express from "express";
import {
  addSavings,
  getMySavings,
  getUserSavings,
  getMonthlySavings,
  updateSavings,
  deleteSavings,
} from "../controllers/savings.controller";
import { protect, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";

const router = express.Router();

// Protected routes
router.use(protect);

// All members can access these routes
router.get("/me", getMySavings);

// Leader and Secretary routes
router.post("/", authorize(UserRole.LEADER, UserRole.SECRETARY), addSavings);

router.get(
  "/user/:userId",
  authorize(UserRole.LEADER, UserRole.SECRETARY),
  getUserSavings
);

router.get(
  "/month/:month/:year",
  authorize(UserRole.LEADER, UserRole.SECRETARY),
  getMonthlySavings
);

// Leader only routes
router.put("/:id", authorize(UserRole.LEADER), updateSavings);

router.delete("/:id", authorize(UserRole.LEADER), deleteSavings);

export default router;
