const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createPurchaseReturn } = require("../controllers/purchaseReturnController");

router.post("/", auth, role("admin", "owner"), createPurchaseReturn);

module.exports = router;
