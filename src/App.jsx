import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // User token check & set user state
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          uid: decoded.uid,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Logout function clears token and user state, navigates to login
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div>लोड हो रहा है...</div>;
  }

  return (
    <div className="app">
      {/* Optional: Header with logout button */}
      {user && (
        <header style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}>
          <span>स्वागत है, {user.email} ({user.role})</span>
          <button onClick={logout} style={{ marginLeft: "20px" }}>
            Logout
          </button>
        </header>
      )}

      <Routes>
        {/* Redirect root to dashboard according to role */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin-dashboard" replace />
              ) : user.role === "seller" ? (
                <Navigate to="/seller-dashboard" replace />
              ) : (
                <Navigate to="/customer-dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin8404-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard user={user} logout={logout} />
            ) : (
              <Navigate to="/admin8404-login" replace />
            )
          }
        />

        {/* Protected Seller Routes */}
        <Route
          path="/seller-dashboard"
          element={
            user && user.role === "seller" ? (
              <SellerDashboard user={user} logout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Customer Routes */}
        <Route path="/customer-dashboard" element={<CustomerDashboard user={user} logout={logout} />} />

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
