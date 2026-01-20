const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createSaleReturn } = require("../controllers/saleReturnController");

router.post("/", auth, role("admin", "owner"), createSaleReturn);

module.exports = router;
