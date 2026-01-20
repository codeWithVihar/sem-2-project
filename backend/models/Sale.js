const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true
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

    subTotal: Number,
    gstTotal: Number,
    discount: {
      type: Number,
      default: 0
    },
    grandTotal: Number,

    paymentType: {
      type: String,
      enum: ["cash", "upi", "bank", "credit"],
      default: "cash"
    },

    paidAmount: {
      type: Number,
      default: 0
    },

    balanceAmount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
