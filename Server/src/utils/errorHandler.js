/*
  ✨ Centralized Error Handling System ✨

  1. We create custom error classes like BadRequestError, NotFoundError, etc.
  2. In our routes, we throw these custom errors when needed.
  3. The global error handler (errorHandler) catches all errors and sends proper responses.

  This keeps the code clean, consistent, and professional.
*/



// Global error handling middleware for Express
export const errorHandler = (err, req, res, next) => {
  // Check if the error is a custom AppError (like NotFoundError, BadRequestError, etc.)
  if (err instanceof AppError) {
    // Send proper error status and message from the custom error
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // If the error is not a known AppError (unexpected or system error)
  // Send a generic 500 Internal Server Error response
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};




// Base class for custom errors

export class AppError extends Error {
  statusCode;       // HTTP status code (e.g., 404, 400)
  isOperational;    // To identify if it's a trusted error

  constructor(message, statusCode = 500, isOperational = true) {
    super(message); // Call parent Error constructor
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture the stack trace (line number where error was thrown)
    Error.captureStackTrace(this, this.constructor);
  }
}
// Custom error for 404 Not Found
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

// Custom error for 409 Conflict (e.g., duplicate entry)
export class ConflictError extends AppError {
  constructor(message = "Conflict occurred") {
    super(message, 409);
  }
}

// Custom error for 400 Bad Request (e.g., missing fields)
export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

// Custom error for 401 Unauthorized (e.g., not logged in)
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}