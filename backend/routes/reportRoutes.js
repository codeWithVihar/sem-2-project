const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  stockReport,
  lowStockReport,
  salesReport,
  purchaseReport
} = require("../controllers/reportController");

router.get("/stock", auth, role("admin", "owner"), stockReport);
router.get("/low-stock", auth, role("admin", "owner"), lowStockReport);
router.get("/sales", auth, role("admin", "owner"), salesReport);
router.get("/purchases", auth, role("admin", "owner"), purchaseReport);

module.exports = router;
