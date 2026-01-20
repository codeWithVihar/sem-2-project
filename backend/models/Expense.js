const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: "General"
    },

    amount: {
      type: Number,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    note: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
