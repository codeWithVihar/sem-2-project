import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    minStock: "",
    salePrice: ""
  });

  // Fetch products
  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    await api.post("/products", form);
    setForm({
      name: "",
      category: "",
      stock: "",
      minStock: "",
      salePrice: ""
    });
    loadProducts();
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await api.delete(`/products/${id}`);
      loadProducts();
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h2>Products</h2>

        {/* ADD PRODUCT FORM */}
        <form onSubmit={addProduct} style={styles.form}>
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Min Stock"
            value={form.minStock}
            onChange={(e) =>
              setForm({ ...form, minStock: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Sale Price"
            value={form.salePrice}
            onChange={(e) =>
              setForm({ ...form, salePrice: e.target.value })
            }
            required
          />
          <button>Add Product</button>
        </form>

        {/* PRODUCT TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Min</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                style={
                  p.stock <= p.minStock
                    ? { background: "#ffe5e5" }
                    : {}
                }
              >
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>{p.minStock}</td>
                <td>₹{p.salePrice}</td>
                <td>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: 10,
    marginBottom: 30
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};

export default Products;
