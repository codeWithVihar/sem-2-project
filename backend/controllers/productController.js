const Product = require("../models/Product");

// ➕ Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📄 Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Soft Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Product disabled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ⚠️ Low Stock Alert
exports.getLowStockProducts = async (req, res) => {
  try {
    const lowStock = await Product.find({
      $expr: { $lte: ["$stock", "$minStock"] }
    });
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
