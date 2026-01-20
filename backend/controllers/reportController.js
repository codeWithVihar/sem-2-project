const Product = require("../models/Product");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");

// 1️⃣ Stock Report
exports.stockReport = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      "name category stock minStock salePrice"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Low Stock Report
exports.lowStockReport = async (req, res) => {
  try {
    const lowStock = await Product.find({
      $expr: { $lte: ["$stock", "$minStock"] }
    });
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Sales Report
exports.salesReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    const sales = await Sale.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    }).populate("party", "name");

    const totalSales = sales.reduce(
      (sum, sale) => sum + sale.grandTotal,
      0
    );

    res.json({ totalSales, sales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ Purchase Report
exports.purchaseReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    const purchases = await Purchase.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    }).populate("party", "name");

    const totalPurchase = purchases.reduce(
      (sum, purchase) => sum + purchase.grandTotal,
      0
    );

    res.json({ totalPurchase, purchases });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
