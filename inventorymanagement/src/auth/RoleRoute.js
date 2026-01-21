import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowed }) {
  const role = localStorage.getItem("role");
  return allowed.includes(role)
    ? children
    : <Navigate to="/dashboard" />;
}

export default RoleRoute;
