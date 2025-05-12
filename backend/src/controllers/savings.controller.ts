import { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Savings from "../models/savings.model";
import User from "../models/user.model";
import Group from "../models/group.model";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
} from "../utils/response.util";

// @desc    Add new savings entry for a user
// @route   POST /api/savings
// @access  Private (Leader and Secretary only)
export const addSavings = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { userId, amount, month, year, notes } = req.body;
  const groupId = req.user?.groupId;
  const enteredBy = req.user?.id;

  try {
    // Check if the user exists and belongs to the same group
    const user = await User.findOne({ _id: userId, groupId });
    if (!user) {
      return notFoundResponse(res, "User not found or not in your group");
    }

    // Check if there's already a savings entry for this user in the given month/year
    const existingEntry = await Savings.findOne({
      userId,
      groupId,
      month,
      year,
    });

    if (existingEntry) {
      return errorResponse(
        res,
        "Savings entry already exists for this user in the specified month",
        400
      );
    }

    // Create new savings entry
    const savings = await Savings.create({
      userId,
      groupId,
      amount,
      month,
      year,
      enteredBy,
      notes,
    });

    // Update user's total savings
    user.savings += amount;
    await user.save();

    // Update group's total savings and balance
    const group = await Group.findById(groupId);
    if (group) {
      group.totalSavings += amount;
      group.totalAmount += amount;
      group.currentBalance += amount;
      await group.save();
    }

    return successResponse(
      res,
      {
        id: savings._id,
        userId: savings.userId,
        amount: savings.amount,
        month: savings.month,
        year: savings.year,
        entryDate: savings.entryDate,
      },
      "Savings added successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, "Failed to add savings", 500, error);
  }
};

// @desc    Get all savings entries for the current user
// @route   GET /api/savings/me
// @access  Private
export const getMySavings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const savings = await Savings.find({ userId }).sort({
      year: -1,
      month: -1,
    });

    return successResponse(res, savings);
  } catch (error) {
    return errorResponse(res, "Failed to get savings", 500, error);
  }
};

// @desc    Get savings entries for a specific user
// @route   GET /api/savings/user/:userId
// @access  Private (Leader and Secretary only)
export const getUserSavings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const groupId = req.user?.groupId;

    // Verify user exists and belongs to the same group
    const user = await User.findOne({ _id: userId, groupId }).select("name");
    if (!user) {
      return notFoundResponse(res, "User not found or not in your group");
    }

    const savings = await Savings.find({ userId, groupId }).sort({
      year: -1,
      month: -1,
    });

    return successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
      },
      savings,
    });
  } catch (error) {
    return errorResponse(res, "Failed to get user savings", 500, error);
  }
};

// @desc    Get all savings entries for the current month
// @route   GET /api/savings/month/:month/:year
// @access  Private (Leader and Secretary only)
export const getMonthlySavings = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const groupId = req.user?.groupId;

    // Aggregate to get all savings for the month with user details
    const savings = await Savings.aggregate([
      {
        $match: {
          groupId: new mongoose.Types.ObjectId(groupId as string),
          month,
          year,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          month: 1,
          year: 1,
          entryDate: 1,
          userId: 1,
          "user.name": 1,
          "user.role": 1,
        },
      },
      {
        $sort: { "user.name": 1 },
      },
    ]);

    // Calculate total amount
    const totalAmount = savings.reduce((sum, entry) => sum + entry.amount, 0);

    return successResponse(res, {
      month,
      year,
      totalAmount,
      count: savings.length,
      savings,
    });
  } catch (error) {
    return errorResponse(res, "Failed to get monthly savings", 500, error);
  }
};

// @desc    Update a savings entry
// @route   PUT /api/savings/:id
// @access  Private (Leader only)
export const updateSavings = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { id } = req.params;
  const { amount } = req.body;
  const groupId = req.user?.groupId;

  try {
    // Find the savings entry
    const savings = await Savings.findOne({ _id: id, groupId });
    if (!savings) {
      return notFoundResponse(res, "Savings entry not found");
    }

    // Calculate difference in amount
    const amountDifference = amount - savings.amount;

    // Update savings amount
    const oldAmount = savings.amount;
    savings.amount = amount;
    await savings.save();

    // Update user's total savings
    const user = await User.findById(savings.userId);
    if (user) {
      user.savings += amountDifference;
      await user.save();
    }

    // Update group's total savings and balance
    const group = await Group.findById(groupId);
    if (group) {
      group.totalSavings += amountDifference;
      group.totalAmount += amountDifference;
      group.currentBalance += amountDifference;
      await group.save();
    }

    return successResponse(
      res,
      {
        id: savings._id,
        userId: savings.userId,
        amount: savings.amount,
        oldAmount,
        month: savings.month,
        year: savings.year,
      },
      "Savings updated successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to update savings", 500, error);
  }
};

// @desc    Delete a savings entry
// @route   DELETE /api/savings/:id
// @access  Private (Leader only)
export const deleteSavings = async (req: Request, res: Response) => {
  const { id } = req.params;
  const groupId = req.user?.groupId;

  try {
    // Find the savings entry
    const savings = await Savings.findOne({ _id: id, groupId });
    if (!savings) {
      return notFoundResponse(res, "Savings entry not found");
    }

    // Store the amount before deletion
    const deletedAmount = savings.amount;
    const userId = savings.userId;

    // Delete the savings entry
    await savings.deleteOne();

    // Update user's total savings
    const user = await User.findById(userId);
    if (user) {
      user.savings -= deletedAmount;
      await user.save();
    }

    // Update group's total savings and balance
    const group = await Group.findById(groupId);
    if (group) {
      group.totalSavings -= deletedAmount;
      group.totalAmount -= deletedAmount;
      group.currentBalance -= deletedAmount;
      await group.save();
    }

    return successResponse(
      res,
      { id, amount: deletedAmount },
      "Savings entry deleted successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to delete savings", 500, error);
  }
};
