const express = require("express");

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected Routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("screenshot"),
  createProject
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("screenshot"),
  updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProject
);

module.exports = router;