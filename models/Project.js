const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    screenshot: {
      type: String,
      default: "",
    },

    techStack: [
      {
        type: String,
      },
    ],

    githubUrl: {
      type: String,
      required: true,
    },

    liveDemoUrl: {
      type: String,
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// GET http://localhost:27017/api/projects

module.exports = mongoose.model("Project", projectSchema);