
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import SellerRegister from "./pages/SellerRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        {/* Redirect all users to customer-dashboard */}
        <Route path="/" element={<Navigate to="/customer-dashboard" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Admin Routes */}
        <Route path="/admin8404-login" element={<AdminLogin />} />
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

        {/* Customer Route — accessible by all */}
        <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
