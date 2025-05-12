import mongoose, { Document, Schema } from "mongoose";

// Transaction types enum
export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

// Transaction categories enum
export enum TransactionCategory {
  // Income categories
  INTEREST = "interest",
  PENALTY = "penalty",
  DONATION = "donation",
  OTHER_INCOME = "other_income",

  // Expense categories
  ADMINISTRATIVE = "administrative",
  BANK_CHARGES = "bank_charges",
  TRAVEL = "travel",
  STATIONERY = "stationery",
  OTHER_EXPENSE = "other_expense",
}

// Transaction interface
export interface ITransaction extends Document {
  groupId: mongoose.Types.ObjectId;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: Date;
  month: string;
  year: string;
  recordedBy: mongoose.Types.ObjectId;
  isActive: boolean;
}

// Transaction Schema
const transactionSchema = new Schema<ITransaction>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: [true, "Transaction type is required"],
    },
    category: {
      type: String,
      enum: Object.values(TransactionCategory),
      required: [true, "Transaction category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    month: {
      type: String,
      required: [true, "Month is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
