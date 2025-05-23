import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // फिलहाल JWT decode हटा दिया गया है
    const token = localStorage.getItem("jwtToken");

    if (token) {
      setUser({
        uid: "dummyUID",
        email: "dummy@example.com",
        role: "customer", // या "admin", "seller" जैसे roles आप manually बदल सकते हैं
      });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<CustomerDashboard user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin8404-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard user={user} />} />
        <Route path="/seller-dashboard" element={<SellerDashboard user={user} />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
