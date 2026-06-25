const Project = require("../models/Project");

// helper: safely parse techStack
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

// helper: safely parse boolean
const parseBoolean = (value) => {
  return value === true || value === "true";
};

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate(
        "student",
        "name email profilePhoto batch"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate(
      "student",
      "name email profilePhoto batch"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE project
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      githubUrl,
      liveDemoUrl,
      student,
      isFeatured,
    } = req.body;

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
      student,
      isFeatured: parseBoolean(isFeatured),
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    if (req.body.techStack !== undefined) {
      updateData.techStack = parseTechStack(req.body.techStack);
    }

    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured = parseBoolean(req.body.isFeatured);
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
      "student",
      "name email profilePhoto batch"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};