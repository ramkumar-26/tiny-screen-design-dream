import express from "express";
import {
  addTransaction,
  getTransactions,
  getMonthlyTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller";
import { protect, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";

const router = express.Router();

// Protected routes
router.use(protect);

// All members can access these routes
router.get("/", getTransactions);
router.get("/monthly/:month/:year", getMonthlyTransactions);

// Leader and Secretary routes
router.post(
  "/",
  authorize(UserRole.LEADER, UserRole.SECRETARY),
  addTransaction
);

// Leader only routes
router.put("/:id", authorize(UserRole.LEADER), updateTransaction);

router.delete("/:id", authorize(UserRole.LEADER), deleteTransaction);

export default router;
