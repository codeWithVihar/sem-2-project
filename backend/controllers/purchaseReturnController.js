const PurchaseReturn = require("../models/PurchaseReturn");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Party = require("../models/Party");

exports.createPurchaseReturn = async (req, res) => {
  try {
    const { purchase, items, reason } = req.body;

    const purchaseData = await Purchase.findById(purchase).populate("party");
    if (!purchaseData)
      return res.status(404).json({ message: "Purchase not found" });

    let returnAmount = 0;

    // 1️⃣ Decrease stock
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (product.stock < item.quantity)
        return res
          .status(400)
          .json({ message: "Insufficient stock to return" });

      const itemTotal = item.quantity * item.price;
      const itemGST = (itemTotal * item.gstRate) / 100;

      returnAmount += itemTotal + itemGST;

      // 🔻 STOCK DECREASE
      product.stock -= item.quantity;
      await product.save();

      item.total = itemTotal + itemGST;
    }

    // 2️⃣ Save Purchase Return
    const purchaseReturn = await PurchaseReturn.create({
      purchase,
      party: purchaseData.party._id,
      items,
      returnAmount,
      reason
    });

    // 3️⃣ Adjust Supplier Balance (Debit Note)
    const supplier = await Party.findById(purchaseData.party._id);
    supplier.currentBalance -= returnAmount;
    await supplier.save();

    res.status(201).json(purchaseReturn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
