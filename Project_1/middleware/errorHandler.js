function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((item) => ({
      field: item.path,
      message: item.message
    }));
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID"
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.status ? err.message : "Something went wrong"
  });
}

module.exports = errorHandler;
