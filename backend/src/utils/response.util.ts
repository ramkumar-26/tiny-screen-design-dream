import { Response } from "express";

// Success response helper
export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Operation successful",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Error response helper
export const errorResponse = (
  res: Response,
  message = "Operation failed",
  statusCode = 500,
  error: any = null
) => {
  // Log the error for server-side debugging
  if (error) {
    console.error("Error:", error);
  }

  const response: { success: boolean; message: string; error?: any } = {
    success: false,
    message,
  };

  // Include error details in development mode
  if (process.env.NODE_ENV === "development" && error) {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

// Not found response helper
export const notFoundResponse = (
  res: Response,
  message = "Resource not found"
) => {
  return errorResponse(res, message, 404);
};

// Validation error response helper
export const validationErrorResponse = (res: Response, errors: any[]) => {
  return res.status(400).json({
    success: false,
    message: "Validation error",
    errors,
  });
};
