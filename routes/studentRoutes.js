const express = require("express");

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getStudents);
router.get("/:id", getStudentById);

// Protected Routes
router.post("/", authMiddleware, createStudent);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent)
module.exports = router;