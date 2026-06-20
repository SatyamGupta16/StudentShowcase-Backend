const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database configuration
const connectDB = require("./config/db");

// Route imports
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Initialize express app
const app = express();

// Connect MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Project Showcase API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Student routes
app.use("/api/students", studentRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// Server port
const PORT = process.env.PORT || 27017;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});