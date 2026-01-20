const Party = require("../models/Party");

// ➕ Create Party
exports.createParty = async (req, res) => {
  try {
    const party = await Party.create(req.body);
    res.status(201).json(party);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📄 Get All Parties
exports.getAllParties = async (req, res) => {
  try {
    const parties = await Party.find({ isActive: true });
    res.json(parties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get Single Party
exports.getPartyById = async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    res.json(party);
  } catch (error) {
    res.status(404).json({ message: "Party not found" });
  }
};

// ✏️ Update Party
exports.updateParty = async (req, res) => {
  try {
    const party = await Party.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(party);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Soft Delete Party
exports.deleteParty = async (req, res) => {
  try {
    await Party.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Party disabled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
