const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ======================================================
// Helper Function: Parse Skills
// Converts skills into an array
// Supports:
// 1. Array
// 2. JSON string
// 3. Comma-separated string
// ======================================================
const parseSkills = (skills) => {
  if (!skills) return [];

  if (Array.isArray(skills)) return skills;

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

// ======================================================
// Helper Function: Parse Boolean
// Converts "true" or true into boolean true
// ======================================================
const parseBoolean = (value) => {
  return value === true || value === "true";
};

// ======================================================
// GET ALL USERS (Students)
// ======================================================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "student",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE USER BY ID
// ======================================================
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      role: "student",
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// CREATE USER
// ======================================================
exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      bio,
      github,
      linkedin,
      batch,
      isFeatured,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Handle profile photo upload
    const profilePhoto = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      bio,
      profilePhoto,
      skills: parseSkills(req.body.skills),
      github,
      linkedin,
      batch,
      isFeatured: parseBoolean(isFeatured),
    });

    // Remove password before sending response
    const response = user.toObject();
    delete response.password;

    res.status(201).json({
      message: "User created successfully",
      user: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// UPDATE USER
// ======================================================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    // Parse skills if provided
    if (req.body.skills !== undefined) {
      updateData.skills = parseSkills(
        req.body.skills
      );
    }

    // Parse featured flag
    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured = parseBoolean(
        req.body.isFeatured
      );
    }

    // Update profile photo if uploaded
    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    // Hash password if updating password
    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        10
      );
    }

    const user = await User.findOneAndUpdate(
      {
        _id: id,
        role: "student",
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// DELETE USER
// ======================================================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOneAndDelete({
      _id: id,
      role: "student",
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};