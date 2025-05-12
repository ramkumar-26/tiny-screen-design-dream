import express from "express";
import {
  requestLoan,
  updateLoanStatus,
  getMyLoans,
  recordLoanPayment,
} from "../controllers/loan.controller";
import { protect, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../models/user.model";

const router = express.Router();

// Protected routes
router.use(protect);

// All members can access these routes
router.post("/request", requestLoan);
router.get("/me", getMyLoans);

// Leader only routes
router.put("/:id/status", authorize(UserRole.LEADER), updateLoanStatus);

// Leader and Secretary routes
router.post(
  "/:id/payment",
  authorize(UserRole.LEADER, UserRole.SECRETARY),
  recordLoanPayment
);

export default router;
