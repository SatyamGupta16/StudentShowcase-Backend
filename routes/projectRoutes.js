const express = require("express");

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected Routes
router.post(
  "/",
  authMiddleware,
  upload.single("screenshot"),
  createProject
);

router.put(
  "/:id",
  authMiddleware,
  updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

module.exports = router;