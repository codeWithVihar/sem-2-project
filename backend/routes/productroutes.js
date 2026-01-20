const express = require("express");
const router = express.Router();

// ✅ IMPORTS MUST COME FIRST
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require("../controllers/productController");

// ✅ ROUTES AFTER IMPORTS
router.post("/", auth, role("admin", "owner"), createProduct);
router.get("/", auth, getAllProducts);
router.get("/low-stock", auth, getLowStockProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, role("admin", "owner"), updateProduct);
router.delete("/:id", auth, role("admin", "owner"), deleteProduct);

module.exports = router;
