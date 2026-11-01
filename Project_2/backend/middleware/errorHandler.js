// middleware/errorHandler.js
// Practical Concept: Practical 4 (Global Error Handling Middleware)

// Express identifies error middleware by having 4 arguments: (err, req, res, next)
const errorHandler = (err, req, res, next) => {
  console.error("[ERROR CAUGHT]:", err.message || err);

  // If response status code was already set to an error (4xx/5xx), keep it; otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Return a clean, structured JSON response to the client
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
};

module.exports = errorHandler;
