const express = require("express");
const router = express.Router();
const Test = require("../models/Test");

// Insert test data
router.post("/", async (req, res) => {
  const test = await Test.create(req.body);
  res.json(test);
});

// Fetch test data
router.get("/", async (req, res) => {
  const data = await Test.find();
  res.json(data);
});

module.exports = router;
