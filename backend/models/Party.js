const mongoose = require("mongoose");

const partySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["customer", "supplier", "both"],
      required: true
    },

    phone: String,
    email: String,

    address: {
      line1: String,
      city: String,
      state: String,
      pincode: String
    },

    gstNumber: String,

    creditLimit: {
      type: Number,
      default: 0
    },

    openingBalance: {
      type: Number,
      default: 0
    },

    currentBalance: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Party", partySchema);
