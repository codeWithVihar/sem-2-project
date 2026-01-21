import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h3>Smart Inventory</h3>

      <div style={styles.links}>
        {/* Visible to all logged-in users */}
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        {/* Admin / Owner only */}
        {(user?.role === "admin" || user?.role === "owner") && (
          <>
            <button>Products</button>
            <button>Parties</button>
            <button>Reports</button>
          </>
        )}

        {/* Employee only */}
        {user?.role === "employee" && (
          <button>Sales</button>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white"
  },
  links: {
    display: "flex",
    gap: "10px"
  }
};

export default Navbar;
