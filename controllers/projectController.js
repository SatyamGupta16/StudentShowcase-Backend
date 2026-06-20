const Project = require("../models/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "student",
      "name email"
    );

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
      "name email"
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
      screenshot,
      techStack,
      githubUrl,
      liveDemoUrl,
      student,
      isFeatured,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      screenshot,
      techStack,
      githubUrl,
      liveDemoUrl,
      student,
      isFeatured,
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

    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
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