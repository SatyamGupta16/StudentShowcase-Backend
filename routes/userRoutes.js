// Import Express framework
const express = require("express");

// Import all user controller functions
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Import authentication middleware
// Ensures only logged-in users can access protected routes
const authMiddleware = require("../middleware/authMiddleware");

// Import authorization middleware
// Ensures only admin users can perform admin operations
const adminMiddleware = require("../middleware/adminMiddleware");

// Import Multer upload middleware
// Handles profile photo uploads
const upload = require("../middleware/uploadMiddleware");

// Create an Express router instance
const router = express.Router();


// Get all users
router.get("/", getUsers);

// Get a single user by ID
router.get("/:id", getUserById);

  //  Protected Routes
  //  These routes require:
  //  1. User Authentication
  //  2. Admin Authorization
  //  3. File Upload (if profile photo is provided)
  
// Create a new user
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("profilePhoto"),
  createUser
);

// Update an existing user
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("profilePhoto"),
  updateUser
);

// Delete a user
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

// Export router
module.exports = router;