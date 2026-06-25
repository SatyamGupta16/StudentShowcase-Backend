const Student = require("../models/Student");

// helper: safely parse skills
const parseSkills = (skills) => {
  if (!skills) return [];

  if (Array.isArray(skills)) {
    return skills;
  }

  try {
    const parsed = JSON.parse(skills);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
};

// helper: safely parse boolean
const parseBoolean = (value) => {
  return value === true || value === "true";
};

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1,
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE student
exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      bio,
      github,
      linkedin,
      batch,
      isFeatured,
    } = req.body;

    const profilePhoto = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const student = await Student.create({
      name,
      email,
      bio,
      profilePhoto,
      skills: parseSkills(req.body.skills),
      github,
      linkedin,
      batch,
      isFeatured: parseBoolean(isFeatured),
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    if (req.body.skills !== undefined) {
      updateData.skills = parseSkills(req.body.skills);
    }

    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured = parseBoolean(req.body.isFeatured);
    }

    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    const student = await Student.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};