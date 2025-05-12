import express from "express";
import {
  getGroupDetails,
  updateGroup,
  getGroupMembers,
  getRulesAndNotices,
  updateRulesAndNotices,
} from "../controllers/group.controller";
import { protect, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";

const router = express.Router();

// Protected routes
router.use(protect);

// All members can access these routes
router.get("/", getGroupDetails);
router.get("/members", getGroupMembers);
router.get("/rules-notices", getRulesAndNotices);

// Leader only routes
router.put("/", authorize(UserRole.LEADER), updateGroup);
router.put("/rules-notices", authorize(UserRole.LEADER), updateRulesAndNotices);

export default router;
