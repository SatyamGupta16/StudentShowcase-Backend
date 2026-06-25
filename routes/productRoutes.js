const express = require("express");

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected routes
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

module.exports = router;