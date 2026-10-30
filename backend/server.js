// server.js
// Practical Concept: Practical 4, Practical 5, Practical 6 & Practical 7
// Express Server, MongoDB Connection, Authentication & Middleware Pipeline

// 1. Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// 2. Load environment variables
dotenv.config();

// 3. Import custom middleware and routes
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const eventRoutes = require("./routes/eventRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/ai");

// 4. Register EventEmitter listeners
require("./listeners");

// 5. Initialize Express app
const app = express();

// 6. Built-in middleware
app.use(express.json());
app.use(cors());

// 7. Custom request logging middleware
app.use(logger);

// 8. Health check / welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Event & Task Management System API!",
    status: "Running",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me (Bearer Token Required)",
      },
      events: {
        getAllEvents: "GET /api/events",
        getSingleEvent: "GET /api/events/:id",
        createEvent: "POST /api/events (Protected)",
        updateEvent: "PUT /api/events/:id (Protected)",
        deleteEvent: "DELETE /api/events/:id (Protected)",
      },
      tasks: {
        getAllTasks: "GET /api/tasks (Protected)",
        getSingleTask: "GET /api/tasks/:id (Protected)",
        createTask: "POST /api/tasks (Protected)",
        updateTask: "PUT /api/tasks/:id (Protected)",
        deleteTask: "DELETE /api/tasks/:id (Protected)",
      },
      ai: {
        generateDescription: "POST /api/ai/generate-description (Protected)",
      },
    },
  });
});

// 9. Register routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// Backward compatibility: support /tasks as well
app.use("/tasks", taskRoutes);

// 10. 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 11. Global error handler (must be last)
app.use(errorHandler);

// backend/server.js  (bottom of file)
// Export the app so Supertest can call it without opening a real port,
// and only connect to MongoDB / listen when the file is run directly.
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/management_system_db")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
