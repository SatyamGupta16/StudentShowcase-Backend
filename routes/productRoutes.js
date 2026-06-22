const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const router = express.Router();

// POST http://localhost:27017/api/products
router.post("/", upload.single("image"), createProduct);

// GET http://localhost:27017/api/products
router.get("/", getProducts);

module.exports = router;