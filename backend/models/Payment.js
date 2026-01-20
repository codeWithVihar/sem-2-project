const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: true
    },

    type: {
      type: String,
      enum: ["receipt", "payment"], // receipt = from customer, payment = to supplier
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    mode: {
      type: String,
      enum: ["cash", "bank", "upi"],
      default: "cash"
    },

    reference: String, // UPI ref / cheque / txn id

    note: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
