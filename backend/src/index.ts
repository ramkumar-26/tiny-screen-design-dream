import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// Routes
import authRoutes from "./routes/auth.routes";
import groupRoutes from "./routes/group.routes";
import userRoutes from "./routes/user.routes";
import savingsRoutes from "./routes/savings.routes";
import loanRoutes from "./routes/loan.routes";
import transactionRoutes from "./routes/transaction.routes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
try {
  connectDB();
} catch (error) {
  console.error("Failed to connect to MongoDB, but continuing for testing");
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/users", userRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/transactions", transactionRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("SHG Manager API is running");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  // Do not close server in development mode
  if (process.env.NODE_ENV !== "development") {
    process.exit(1);
  }
});
