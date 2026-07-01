const Project = require("../models/Project");

// ======================================================
// Helper: Parse Tech Stack
// Supports:
// 1. Array
// 2. JSON string
// 3. Comma-separated string
// ======================================================
const parseTechStack = (techStack) => {
  if (!techStack) return [];

  if (Array.isArray(techStack)) {
    return techStack;
  }

  try {
    const parsed = JSON.parse(techStack);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
  }
};

// ======================================================
// Helper: Parse Boolean
// ======================================================
const parseBoolean = (value) => {
  return value === true || value === "true";
};

// ======================================================
// GET ALL PROJECTS
// ======================================================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate(
        "user",
        "name email profilePhoto batch"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// GET PROJECT BY ID
// ======================================================
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate(
      "user",
      "name email profilePhoto batch"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// CREATE PROJECT
// ======================================================
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      githubUrl,
      liveDemoUrl,
      user,
      isFeatured,
    } = req.body;

    if (
      !title ||
      !description ||
      !githubUrl ||
      !liveDemoUrl ||
      !user
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const screenshot = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const project = await Project.create({
      title,
      description,
      screenshot,
      techStack: parseTechStack(req.body.techStack),
      githubUrl,
      liveDemoUrl,
      user,
      isFeatured: parseBoolean(isFeatured),
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// UPDATE PROJECT
// ======================================================
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    if (req.body.techStack !== undefined) {
      updateData.techStack = parseTechStack(
        req.body.techStack
      );
    }

    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured = parseBoolean(
        req.body.isFeatured
      );
    }

    if (req.file) {
      updateData.screenshot = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "user",
      "name email profilePhoto batch"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================================
// DELETE PROJECT
// ======================================================
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};