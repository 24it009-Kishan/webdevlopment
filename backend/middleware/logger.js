// middleware/logger.js
// Practical Concept: Practical 4 (Custom Request Logging Middleware)

// Middleware function to log incoming HTTP requests
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl || req.url;
  const timestamp = new Date().toISOString();

  console.log(`[REQUEST] ${method} ${url} - ${timestamp}`);

  // Call next() to pass control to the next middleware or route handler
  next();
};

module.exports = logger;
