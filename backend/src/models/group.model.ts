import mongoose, { Document, Schema } from "mongoose";

// Group interface
export interface IGroup extends Document {
  name: string;
  groupId: string;
  president: string;
  totalAmount: number;
  currentBalance: number;
  totalLoans: number;
  totalSavings: number;
  totalExpenses: number;
  totalIncome: number;
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
  savingMonth: string;
  savingYear: string;
  rules: string[];
  notices: string[];
}

// Group Schema
const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
      maxlength: [50, "Group name cannot be more than 50 characters"],
    },
    groupId: {
      type: String,
      required: [true, "Group ID is required"],
      unique: true,
      trim: true,
    },
    president: {
      type: String,
      required: [true, "President name is required"],
      trim: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    totalLoans: {
      type: Number,
      default: 0,
    },
    totalSavings: {
      type: Number,
      default: 0,
    },
    totalExpenses: {
      type: Number,
      default: 0,
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    savingMonth: {
      type: String,
      required: [true, "Saving month is required"],
    },
    savingYear: {
      type: String,
      required: [true, "Saving year is required"],
    },
    rules: [
      {
        type: String,
      },
    ],
    notices: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Generate a unique Group ID before saving if not provided
groupSchema.pre("save", function (next) {
  if (!this.isModified("groupId") || this.groupId) {
    return next();
  }

  // Generate a random 4-character string
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  this.groupId = `SHG${Math.floor(1000 + Math.random() * 9000)}${randomChars}`;
  next();
});

const Group = mongoose.model<IGroup>("Group", groupSchema);

export default Group;
