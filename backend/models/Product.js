const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  sku: String,
  category: String,
  unit: String,
  purchasePrice: Number,
  salePrice: Number,
  gst: Number,
  stock: Number,
  minStock: Number
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
