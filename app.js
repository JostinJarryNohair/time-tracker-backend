const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { PORT } = require("./config/env.config");
const connectDB = require("./config/database");

// Import routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const carLogRoutes = require("./routes/carLogRoutes");

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// API routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/employees",
  (req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] Accessing employee routes:`,
      req.method,
      req.url
    );
    next();
  },
  employeeRoutes
);
app.use(
  "/api/car-logs",
  (req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] Accessing car-log routes:`,
      req.method,
      req.url
    );
    next();
  },
  carLogRoutes
);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
