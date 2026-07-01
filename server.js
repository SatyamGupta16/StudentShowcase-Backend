const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Database configuration
const connectDB = require("./config/db");

// Route imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const productRoutes = require("./routes/productRoutes");

// Initialize express app
const app = express();

// CORS allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Enable CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Make uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("/api/users", userRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// Product routes
app.use("/api/products", productRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Server port
const PORT = process.env.PORT || 27017;

// Connect MongoDB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });