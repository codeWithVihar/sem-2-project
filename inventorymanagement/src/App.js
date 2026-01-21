import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";
import { AuthProvider } from "./auth/AuthContext";
import Products from "./pages/Products";
import Sales from "./pages/Sales";

import "./App.css";

// Placeholder pages (can be replaced later)
//const Products = () => <h2>Products Page</h2>;
const Parties = () => <h2>Parties Page</h2>;
const Reports = () => <h2>Reports Page</h2>;
//const Sales = () => <h2>Sales Page</h2>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* Protected Dashboard (All roles) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin / Owner only routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <RoleRoute allowed={["admin", "owner"]}>
                  <Products />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/parties"
            element={
              <ProtectedRoute>
                <RoleRoute allowed={["admin", "owner"]}>
                  <Parties />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <RoleRoute allowed={["admin", "owner"]}>
                  <Reports />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* Employee route */}
          <Route
  path="/sales"
  element={
    <ProtectedRoute>
      <RoleRoute allowed={["admin", "owner", "employee"]}>
        <Sales />
      </RoleRoute>
    </ProtectedRoute>
  }
/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
