import { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Transaction, {
  TransactionType,
  TransactionCategory,
} from "../models/transaction.model";
import Group from "../models/group.model";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
} from "../utils/response.util";

// @desc    Add a new transaction (income or expense)
// @route   POST /api/transactions
// @access  Private (Leader and Secretary only)
export const addTransaction = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { amount, type, category, description, month, year } = req.body;
  const groupId = req.user?.groupId;
  const recordedBy = req.user?.id;

  try {
    // Create the transaction
    const transaction = await Transaction.create({
      groupId,
      amount,
      type,
      category,
      description,
      month,
      year,
      recordedBy,
    });

    // Update group finances
    const group = await Group.findById(groupId);
    if (group) {
      if (type === TransactionType.INCOME) {
        group.totalIncome += amount;
        group.totalAmount += amount;
        group.currentBalance += amount;
      } else if (type === TransactionType.EXPENSE) {
        group.totalExpenses += amount;
        group.currentBalance -= amount;
      }

      await group.save();
    }

    return successResponse(
      res,
      {
        id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
      },
      "Transaction added successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, "Failed to add transaction", 500, error);
  }
};

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req: Request, res: Response) => {
  const groupId = req.user?.groupId;
  const { type, month, year } = req.query;

  try {
    // Build query
    const query: any = { groupId };

    if (type) {
      query.type = type;
    }

    if (month && year) {
      query.month = month;
      query.year = year;
    }

    // Get transactions
    const transactions = await Transaction.find(query).sort({ date: -1 });

    // Calculate totals
    const totalIncome = transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    return successResponse(res, {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    return errorResponse(res, "Failed to get transactions", 500, error);
  }
};

// @desc    Get monthly summary of transactions
// @route   GET /api/transactions/monthly/:month/:year
// @access  Private
export const getMonthlyTransactions = async (req: Request, res: Response) => {
  const { month, year } = req.params;
  const groupId = req.user?.groupId;

  try {
    // Get all transactions for the month
    const transactions = await Transaction.find({
      groupId,
      month,
      year,
    }).sort({ date: -1 });

    // Get category summaries
    const categorySummary = await Transaction.aggregate([
      {
        $match: {
          groupId: new mongoose.Types.ObjectId(groupId as string),
          month,
          year,
        },
      },
      {
        $group: {
          _id: {
            type: "$type",
            category: "$category",
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.type": 1, total: -1 },
      },
    ]);

    // Format category summaries
    const categorized = {
      income: categorySummary
        .filter((item) => item._id.type === TransactionType.INCOME)
        .map((item) => ({
          category: item._id.category,
          total: item.total,
          count: item.count,
        })),
      expenses: categorySummary
        .filter((item) => item._id.type === TransactionType.EXPENSE)
        .map((item) => ({
          category: item._id.category,
          total: item.total,
          count: item.count,
        })),
    };

    // Calculate totals
    const totalIncome = categorized.income.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const totalExpenses = categorized.expenses.reduce(
      (sum, item) => sum + item.total,
      0
    );

    return successResponse(res, {
      month,
      year,
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      categorySummary: categorized,
      transactions,
    });
  } catch (error) {
    return errorResponse(res, "Failed to get monthly transactions", 500, error);
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private (Leader only)
export const updateTransaction = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }

  const { id } = req.params;
  const { amount, category, description } = req.body;
  const groupId = req.user?.groupId;

  try {
    // Find the transaction
    const transaction = await Transaction.findOne({ _id: id, groupId });
    if (!transaction) {
      return notFoundResponse(res, "Transaction not found");
    }

    // Calculate amount difference
    const amountDifference = amount - transaction.amount;

    // Update fields
    if (amount !== undefined) transaction.amount = amount;
    if (category !== undefined) transaction.category = category;
    if (description !== undefined) transaction.description = description;

    await transaction.save();

    // Update group finances if amount changed
    if (amountDifference !== 0) {
      const group = await Group.findById(groupId);
      if (group) {
        if (transaction.type === TransactionType.INCOME) {
          group.totalIncome += amountDifference;
          group.totalAmount += amountDifference;
          group.currentBalance += amountDifference;
        } else if (transaction.type === TransactionType.EXPENSE) {
          group.totalExpenses += amountDifference;
          group.currentBalance -= amountDifference;
        }

        await group.save();
      }
    }

    return successResponse(
      res,
      {
        id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        description: transaction.description,
      },
      "Transaction updated successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to update transaction", 500, error);
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private (Leader only)
export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const groupId = req.user?.groupId;

  try {
    // Find the transaction
    const transaction = await Transaction.findOne({ _id: id, groupId });
    if (!transaction) {
      return notFoundResponse(res, "Transaction not found");
    }

    // Store transaction details for reverting group finances
    const { amount, type } = transaction;

    // Delete the transaction
    await transaction.deleteOne();

    // Update group finances
    const group = await Group.findById(groupId);
    if (group) {
      if (type === TransactionType.INCOME) {
        group.totalIncome -= amount;
        group.totalAmount -= amount;
        group.currentBalance -= amount;
      } else if (type === TransactionType.EXPENSE) {
        group.totalExpenses -= amount;
        group.currentBalance += amount;
      }

      await group.save();
    }

    return successResponse(
      res,
      { id, amount, type },
      "Transaction deleted successfully"
    );
  } catch (error) {
    return errorResponse(res, "Failed to delete transaction", 500, error);
  }
};
