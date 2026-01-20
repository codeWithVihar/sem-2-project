const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Sale route working");
});

module.exports = router;
