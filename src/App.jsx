import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback"; // Don't forget to include this

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        if (decoded.uid && decoded.role && decoded.email) {
          setUser({
            uid: decoded.uid,
            email: decoded.email,
            role: decoded.role,
          });
        } else {
          throw new Error("Token is missing required fields");
        }
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
        <Route path="/" element={<Navigate to="/customer-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

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
              ) : user.role === "customer" ? (
                <Navigate to="/customer-dashboard" replace />
              ) : user.role === "admin" ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
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
