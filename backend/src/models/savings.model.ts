import mongoose, { Document, Schema } from "mongoose";

// Savings interface
export interface ISavings extends Document {
  userId: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId;
  amount: number;
  month: string;
  year: string;
  enteredBy: mongoose.Types.ObjectId;
  isActive: boolean;
  entryDate: Date;
}

// Savings Schema
const savingsSchema = new Schema<ISavings>(
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
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    month: {
      type: String,
      required: [true, "Month is required"],
    },
    year: {
      type: String,
      required: [true, "Year is required"],
    },
    enteredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for userId, month, and year to prevent duplicate entries
savingsSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

const Savings = mongoose.model<ISavings>("Savings", savingsSchema);

export default Savings;
