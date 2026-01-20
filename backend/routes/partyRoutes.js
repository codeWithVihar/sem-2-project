const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createParty,
  getAllParties,
  getPartyById,
  updateParty,
  deleteParty
} = require("../controllers/partyController");

router.post("/", auth, role("admin", "owner"), createParty);
router.get("/", auth, getAllParties);
router.get("/:id", auth, getPartyById);
router.put("/:id", auth, role("admin", "owner"), updateParty);
router.delete("/:id", auth, role("admin", "owner"), deleteParty);

module.exports = router;
