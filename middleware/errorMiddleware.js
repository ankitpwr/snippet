const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for the developer
  console.error(err);

  // Mongoose bad ObjectId (e.g., trying to get a snippet with an invalid ID format)
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new Error(message);
    error.statusCode = 404;
  }

  // Mongoose duplicate key (e.g., trying to sign up with an email that already exists)
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new Error(message);
    error.statusCode = 400;
  }

  // Mongoose validation error (e.g., missing a required field like 'title')
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new Error(message);
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    // Only show the stack trace if we are in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
