const Sale = require("../models/Sale");
const Product = require("../models/product");
const Party = require("../models/Party");

exports.createSale = async (req, res) => {
  try {
    const {
      invoiceNumber,
      party,
      items,
      discount = 0,
      paymentType,
      paidAmount
    } = req.body;

    let subTotal = 0;
    let gstTotal = 0;

    // 1️⃣ Calculate totals & update stock
    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (product.stock < item.quantity)
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });

      const itemTotal = item.quantity * item.price;
      const itemGST = (itemTotal * item.gstRate) / 100;

      subTotal += itemTotal;
      gstTotal += itemGST;

      // 🔻 AUTO STOCK DECREASE
      product.stock -= item.quantity;
      await product.save();

      item.total = itemTotal + itemGST;
    }

    const grandTotal = subTotal + gstTotal - discount;
    const balanceAmount = grandTotal - paidAmount;

    // 2️⃣ Create Sale Invoice
    const sale = await Sale.create({
      invoiceNumber,
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

    // 3️⃣ Update Party Balance (Customer Due)
    const customer = await Party.findById(party);
    customer.currentBalance += balanceAmount;
    await customer.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
