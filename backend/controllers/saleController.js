const Sale = require("../models/Sale");
const Product = require("../models/product");

exports.createSale = async (req, res) => {
  const sale = await Sale.create(req.body);

  for (let item of req.body.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.qty }
    });
  }

  res.status(201).json(sale);
};
