const SaleReturn = require("../models/SaleReturn");
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Party = require("../models/Party");

exports.createSaleReturn = async (req, res) => {
  try {
    const { sale, items, reason } = req.body;

    const saleData = await Sale.findById(sale).populate("party");
    if (!saleData)
      return res.status(404).json({ message: "Sale not found" });

    let returnAmount = 0;

    // 1️⃣ Add stock back
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const itemTotal = item.quantity * item.price;
      const itemGST = (itemTotal * item.gstRate) / 100;

      returnAmount += itemTotal + itemGST;

      // 🔺 STOCK ADD BACK
      product.stock += item.quantity;
      await product.save();

      item.total = itemTotal + itemGST;
    }

    // 2️⃣ Save Sale Return
    const saleReturn = await SaleReturn.create({
      sale,
      party: saleData.party._id,
      items,
      returnAmount,
      reason
    });

    // 3️⃣ Adjust Customer Balance (Credit Note)
    const customer = await Party.findById(saleData.party._id);
    customer.currentBalance -= returnAmount;
    await customer.save();

    res.status(201).json(saleReturn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
