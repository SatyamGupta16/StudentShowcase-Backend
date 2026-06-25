const express = require("express");

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getStudents);
router.get("/:id", getStudentById);

// Protected Routes
router.post(
  "/",
  authMiddleware,
  upload.single("profilePhoto"),
  createStudent
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("profilePhoto"),
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  deleteStudent
);

module.exports = router;