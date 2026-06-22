const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
});

// GET http://localhost:27017/api/products
module.exports = mongoose.model("Product", ProductSchema);