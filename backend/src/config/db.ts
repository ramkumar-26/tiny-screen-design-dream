import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    // Use MongoDB Atlas for development
    const connectionString =
      "mongodb+srv://shguser:shgpassword123@cluster0.mongodb.net/shg-manager?retryWrites=true&w=majority";

    console.log("Connecting to MongoDB Atlas...");
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `Error connecting to MongoDB: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    // Don't exit process in development mode to allow mock data
    if (process.env.NODE_ENV !== "development") {
      process.exit(1);
    }

    console.log("Continuing without database connection for development...");
  }
};
