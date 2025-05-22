import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage से JWT token लें
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        // JWT decode करके user info निकालो
      const decoded = jwtDecode(token);
        // example: decoded में uid, email, role होना चाहिए (backend के हिसाब से)
        setUser({
          uid: decoded.uid,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
        localStorage.removeItem("jwtToken");
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>लोड हो रहा है...</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin8404-login"
          element={<AdminLogin />}
        />
        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/admin8404-login" replace />
            )
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller-dashboard"
          element={
            user && user.role === "seller" ? (
              <SellerDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer-dashboard"
          element={
            user && user.role === "customer" ? (
              <CustomerDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "seller" ? (
                <Navigate to="/seller-dashboard" replace />
              ) : (
                <Navigate to="/customer-dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
