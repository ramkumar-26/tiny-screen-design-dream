import mongoose, { Document, Schema } from "mongoose";

// Loan status enum
export enum LoanStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  PAID = "paid",
  PARTIALLY_PAID = "partially_paid",
}

// Loan interface
export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId;
  amount: number;
  interestRate: number;
  durationMonths: number;
  requestDate: Date;
  approvalDate?: Date;
  startDate?: Date;
  endDate?: Date;
  status: LoanStatus;
  approvedBy?: mongoose.Types.ObjectId;
  remainingAmount: number;
  purpose: string;
  isActive: boolean;
}

// Loan payment interface
export interface ILoanPayment extends Document {
  loanId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  recordedBy: mongoose.Types.ObjectId;
  month: string;
  year: string;
  notes?: string;
}

// Loan Schema
const loanSchema = new Schema<ILoan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Loan amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    interestRate: {
      type: Number,
      required: [true, "Interest rate is required"],
      min: [0, "Interest rate cannot be negative"],
    },
    durationMonths: {
      type: Number,
      required: [true, "Loan duration is required"],
      min: [1, "Duration must be at least 1 month"],
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    approvalDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(LoanStatus),
      default: LoanStatus.PENDING,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    remainingAmount: {
      type: Number,
      default: function (this: ILoan) {
        return this.amount;
      },
    },
    purpose: {
      type: String,
      required: [true, "Loan purpose is required"],
      trim: true,
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

// Loan Payment Schema
const loanPaymentSchema = new Schema<ILoanPayment>(
  {
    loanId: {
      type: Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [1, "Amount must be at least 1"],
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: String,
      required: [true, "Month is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model<ILoan>("Loan", loanSchema);
const LoanPayment = mongoose.model<ILoanPayment>(
  "LoanPayment",
  loanPaymentSchema
);

export { Loan, LoanPayment };
