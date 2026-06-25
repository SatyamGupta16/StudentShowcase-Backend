const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      isFeatured,
    } = req.body;

    const image = req.file
      ? `http://localhost:27017/uploads/${req.file.filename}`
      : "";

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      isFeatured:
        isFeatured === "true" ||
        isFeatured === true,
    });

    res.status(201).json({
      message: "Product saved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving product",
      error: error.message,
    });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured =
        req.body.isFeatured === "true" ||
        req.body.isFeatured === true;
    }

    if (req.file) {
      updateData.image = `http://localhost:27017/uploads/${req.file.filename}`;
    }

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};