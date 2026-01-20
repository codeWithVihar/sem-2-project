const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createPurchase } = require("../controllers/purchaseController");

// Only admin & owner
router.post("/", auth, role("admin", "owner"), createPurchase);

module.exports = router;
