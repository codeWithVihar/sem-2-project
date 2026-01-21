import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import generateInvoicePDF from "../utils/generateInvoicePDF";

function Sales() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentType, setPaymentType] = useState("cash");

  // Load customers & products
  useEffect(() => {
    api.get("/parties").then((res) => {
      setCustomers(res.data.filter(p => p.type === "customer"));
    });

    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart([
      ...cart,
      {
        product: product._id,
        name: product.name,
        price: product.salePrice,
        gstRate: product.gstRate,
        quantity: 1,
        total: product.salePrice
      }
    ]);
  };

  // Update quantity
  const updateQty = (index, qty) => {
    const newCart = [...cart];
    newCart[index].quantity = qty;
    newCart[index].total = qty * newCart[index].price;
    setCart(newCart);
  };

  // Calculate totals
  const subTotal = cart.reduce((sum, i) => sum + i.total, 0);
  const gstTotal = cart.reduce(
    (sum, i) => sum + (i.total * i.gstRate) / 100,
    0
  );
  const grandTotal = subTotal + gstTotal;

  // Submit sale + generate PDF
  const submitSale = async () => {
    const saleData = {
      invoiceNumber: `INV-${Date.now()}`,
      party: selectedCustomer,
      items: cart.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        price: i.price,
        gstRate: i.gstRate,
        total: i.total
      })),
      paymentType,
      paidAmount: paymentType === "credit" ? 0 : grandTotal
    };

    const res = await api.post("/sales", saleData);

    alert("Sale completed successfully");

    // 🔥 Generate PDF bill
    generateInvoicePDF(res.data);

    setCart([]);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h2>Sales</h2>

        {/* Customer Selection */}
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <h3 style={{ marginTop: 20 }}>Products</h3>
        {products.map((p) => (
          <button
            key={p._id}
            onClick={() => addToCart(p)}
            style={{ marginRight: 10 }}
          >
            {p.name}
          </button>
        ))}

        {/* Cart */}
        <h3 style={{ marginTop: 30 }}>Cart</h3>
        {cart.map((item, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            {item.name} — ₹{item.price}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQty(index, Number(e.target.value))
              }
              style={{ marginLeft: 10, width: 60 }}
            />
            = ₹{item.total}
          </div>
        ))}

        {/* Totals */}
        <h4>Subtotal: ₹{subTotal}</h4>
        <h4>GST: ₹{gstTotal.toFixed(2)}</h4>
        <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>

        {/* Payment */}
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="bank">Bank</option>
          <option value="credit">Credit</option>
        </select>

        <br /><br />
        <button
          onClick={submitSale}
          disabled={!selectedCustomer || cart.length === 0}
        >
          Complete Sale & Download Bill
        </button>
      </div>
    </>
  );
}

export default Sales;
