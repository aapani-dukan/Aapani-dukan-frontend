import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      {/* Navbar with three-dot menu */}
      <nav style={{ position: "relative", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <span style={{ fontWeight: "bold" }}>MyApp</span>

        {/* Three-dot button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            float: "right",
            fontSize: "24px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            userSelect: "none",
          }}
          aria-label="Menu"
        >
          &#x22EE; {/* vertical ellipsis */}
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "40px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "160px",
            }}
            onMouseLeave={() => setMenuOpen(false)}
          >
            {!user ? (
              <>
                <Link to="/login" style={menuItemStyle} onClick={() => setMenuOpen(false)}>
                  Customer Login
                </Link>
                <Link to="/login" style={menuItemStyle} onClick={() => setMenuOpen(false)}>
                  Seller Login
                </Link>
                <Link to="/admin8404-login" style={menuItemStyle} onClick={() => setMenuOpen(false)}>
                  Admin Login
                </Link>
              </>
            ) : (
              <>
                <div style={{ padding: "8px 16px", borderBottom: "1px solid #ddd" }}>
                  Logged in as: <br />
                  <strong>{user.email}</strong> ({user.role})
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  style={{ ...menuItemStyle, background: "none", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <Routes>
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

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

const menuItemStyle = {
  display: "block",
  padding: "8px 16px",
  color: "#333",
  textDecoration: "none",
  cursor: "pointer",
};

export default App;
