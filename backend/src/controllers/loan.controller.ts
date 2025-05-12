import { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { Loan, LoanPayment } from "../models/loan.model";
import { LoanStatus } from "../models/loan.model";
import User from "../models/user.model";
import Group from "../models/group.model";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
} from "../utils/response.util";

// @desc    Request a new loan
// @route   POST /api/loans/request
// @access  Private
export const requestLoan = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { amount, purpose, durationMonths } = req.body;
  const userId = req.user?.id;
  const groupId = req.user?.groupId;

  try {
    // Check for existing active loans
    const existingLoan = await Loan.findOne({
      userId,
      status: {
        $in: [
          LoanStatus.PENDING,
          LoanStatus.APPROVED,
          LoanStatus.PARTIALLY_PAID,
        ],
      },
    });

    if (existingLoan) {
      return errorResponse(
        res,
        `You already have an ${existingLoan.status} loan. Please clear it before requesting a new one.`,
        400
      );
    }

    // Default interest rate
    const interestRate = 10; // 10% per annum

    // Create new loan request
    const loan = await Loan.create({
      userId,
      groupId,
      amount,
      interestRate,
      durationMonths,
      purpose,
      status: LoanStatus.PENDING,
    });

    return successResponse(
      res,
      {
        id: loan._id,
        amount: loan.amount,
        status: loan.status,
        requestDate: loan.requestDate,
      },
      "Loan request submitted successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, "Failed to request loan", 500, error);
  }
};

// @desc    Approve/Reject a loan request
// @route   PUT /api/loans/:id/status
// @access  Private (Leader only)
export const updateLoanStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const groupId = req.user?.groupId;
  const approverId = req.user?.id;

  try {
    const loan = await Loan.findOne({ _id: id, groupId });
    if (!loan) {
      return notFoundResponse(res, "Loan request not found");
    }

    if (![LoanStatus.APPROVED, LoanStatus.REJECTED].includes(status)) {
      return errorResponse(
        res,
        "Invalid status. Must be approved or rejected.",
        400
      );
    }

    loan.status = status;
    loan.approvedBy = new mongoose.Types.ObjectId(approverId as string);
    loan.approvalDate = new Date();

    if (status === LoanStatus.APPROVED) {
      loan.startDate = new Date();

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + loan.durationMonths);
      loan.endDate = endDate;

      // Update group balance
      const group = await Group.findById(groupId);
      if (group) {
        group.totalLoans += loan.amount;
        group.currentBalance -= loan.amount;
        await group.save();
      }
    }

    await loan.save();

    return successResponse(
      res,
      {
        id: loan._id,
        status: loan.status,
      },
      `Loan ${status} successfully`
    );
  } catch (error) {
    return errorResponse(res, "Failed to update loan status", 500, error);
  }
};

// @desc    Record a loan payment
// @route   POST /api/loans/:id/payment
// @access  Private (Leader and Secretary only)
export const recordLoanPayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, month, year } = req.body;
  const groupId = req.user?.groupId;
  const recordedBy = req.user?.id;

  try {
    const loan = await Loan.findOne({
      _id: id,
      groupId,
      status: { $in: [LoanStatus.APPROVED, LoanStatus.PARTIALLY_PAID] },
    });

    if (!loan) {
      return notFoundResponse(res, "Active loan not found");
    }

    // Create loan payment record
    const payment = await LoanPayment.create({
      loanId: loan._id,
      userId: loan.userId,
      groupId,
      amount,
      month,
      year,
      recordedBy,
    });

    // Update loan remaining amount
    loan.remainingAmount -= amount;

    // Update loan status if fully paid
    if (loan.remainingAmount === 0) {
      loan.status = LoanStatus.PAID;
    } else {
      loan.status = LoanStatus.PARTIALLY_PAID;
    }

    await loan.save();

    // Update group balance
    const group = await Group.findById(groupId);
    if (group) {
      group.currentBalance += amount;
      await group.save();
    }

    return successResponse(
      res,
      {
        payment: {
          id: payment._id,
          amount: payment.amount,
        },
        loan: {
          id: loan._id,
          remainingAmount: loan.remainingAmount,
          status: loan.status,
        },
      },
      "Loan payment recorded successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, "Failed to record loan payment", 500, error);
  }
};

// @desc    Get my loans
// @route   GET /api/loans/me
// @access  Private
export const getMyLoans = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const loans = await Loan.find({ userId }).sort({ requestDate: -1 });

    return successResponse(res, loans);
  } catch (error) {
    return errorResponse(res, "Failed to get loans", 500, error);
  }
};
