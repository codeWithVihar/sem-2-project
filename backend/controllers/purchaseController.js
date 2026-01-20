const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Party = require("../models/Party");

exports.createPurchase = async (req, res) => {
  console.log("PURCHASE API HIT");
  console.log(req.body);

  try {
    const {
      billNumber,
      party,
      items,
      discount = 0,
      paymentType,
      paidAmount
    } = req.body;

    let subTotal = 0;
    let gstTotal = 0;

    // 1️⃣ Calculate totals & increase stock
    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const itemTotal = item.quantity * item.price;
      const itemGST = (itemTotal * item.gstRate) / 100;

      subTotal += itemTotal;
      gstTotal += itemGST;

      // 🔺 AUTO STOCK INCREASE
      product.stock += item.quantity;
      await product.save();

      item.total = itemTotal + itemGST;
    }

    const grandTotal = subTotal + gstTotal - discount;
    const balanceAmount = grandTotal - paidAmount;

    // 2️⃣ Create Purchase Entry
    const purchase = await Purchase.create({
      billNumber,
      party,
      items,
      subTotal,
      gstTotal,
      discount,
      grandTotal,
      paymentType,
      paidAmount,
      balanceAmount
    });

    // 3️⃣ Update Supplier Balance
    const supplier = await Party.findById(party);
    supplier.currentBalance += balanceAmount;
    await supplier.save();

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
