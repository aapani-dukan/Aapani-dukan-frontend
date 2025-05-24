import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
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
        {/* Open app to customer-dashboard */}
        <Route path="/" element={<Navigate to="/customer-dashboard" replace />} />

        {/* Login and OAuth callback */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Customer Route — accessible by all */}
        <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
