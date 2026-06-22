const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      image: req.file.filename,
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

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};