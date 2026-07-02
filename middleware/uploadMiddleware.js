const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder automatically if it does not exist
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueFileName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|webp/;

  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
  fileSize: 10 * 1024 * 1024, // 10MB
},
});

module.exports = upload;