const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createPayment } = require("../controllers/paymentController");

router.post("/", auth, role("admin", "owner"), createPayment);

module.exports = router;
