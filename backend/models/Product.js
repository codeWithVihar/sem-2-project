const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    sku: {
      type: String,
      unique: true
    },

    category: String,

    unit: {
      type: String, // kg, piece, box
      default: "piece"
    },

    purchasePrice: {
      type: Number,
      required: true
    },

    salePrice: {
      type: Number,
      required: true
    },

    gstRate: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      default: 0
    },

    minStock: {
      type: Number,
      default: 5
    },

    barcode: String,

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

