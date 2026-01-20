const mongoose = require("mongoose");

const purchaseReturnSchema = new mongoose.Schema(
  {
    purchase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
      required: true
    },

    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: Number,
        price: Number,
        gstRate: Number,
        total: Number
      }
    ],

    returnAmount: Number,
    reason: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseReturn", purchaseReturnSchema);
