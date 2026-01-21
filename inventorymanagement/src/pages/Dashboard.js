import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import StockChart from "../charts/StockChart";
import SalesChart from "../charts/SalesChart";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stock, setStock] = useState([]);
  const [sales, setSales] = useState([]);
  const [kpi, setKpi] = useState({ totalSales: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/reports/stock").then((res) => setStock(res.data));

    api
      .get("/reports/sales?from=2024-01-01&to=2030-01-01")
      .then((res) => {
        setSales(res.data.sales || []);
        setKpi({ totalSales: res.data.totalSales });
      });
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: 40 }}>
        <h2>Dashboard</h2>

        {/* KPI CARDS */}
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>Total Sales</h3>
            <p>₹{kpi.totalSales}</p>
          </div>

          <div style={styles.card}>
            <h3>Total Products</h3>
            <p>{stock.length}</p>
          </div>

          <div style={styles.card}>
            <h3>Low Stock</h3>
            <p>{stock.filter((i) => i.stock <= i.minStock).length}</p>
          </div>
        </div>

        {/* Quick Nav Buttons */}
        <div style={styles.quickNav}>
          <button onClick={() => navigate("/products")}>Manage Products</button>
          <button onClick={() => navigate("/sales")}>Sales</button>
          <button onClick={() => navigate("/reports")}>Reports</button>
        </div>

        <h3 style={{ marginTop: 40 }}>Stock Chart</h3>
        {stock.length > 0 && <StockChart data={stock} />}

        <h3 style={{ marginTop: 50 }}>Sales Chart</h3>
        {sales.length > 0 && <SalesChart sales={sales} />}
      </div>
    </>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    gap: 20
  },
  card: {
    padding: 20,
    width: 180,
    borderRadius: 10,
    background: "#f7f7f7",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  quickNav: {
    display: "flex",
    gap: 20,
    marginTop: 20
  }
};

export default Dashboard;
