const Payment = require("../models/Payment");
const Party = require("../models/Party");

exports.createPayment = async (req, res) => {
  try {
    const { party, type, amount, mode, reference, note } = req.body;

    const partyData = await Party.findById(party);
    if (!partyData)
      return res.status(404).json({ message: "Party not found" });

    // 🧠 Ledger Logic
    if (type === "receipt") {
      // Customer paid us → reduce balance
      partyData.currentBalance -= amount;
    } else if (type === "payment") {
      // We paid supplier → reduce balance
      partyData.currentBalance -= amount;
    }

    await partyData.save();

    const payment = await Payment.create({
      party,
      type,
      amount,
      mode,
      reference,
      note
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
