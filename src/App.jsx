import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";

function App() {
  // फिलहाल user/token को हटाया गया है ताकि blank page न आए
  // बाद में इसे step-by-step जोड़ेंगे

  return (
    <div className="app">
      <Routes>
        {/* Redirect home to customer-dashboard */}
        <Route path="/" element={<Navigate to="/customer-dashboard" replace />} />

        {/* Basic Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin8404-login" element={<AdminLogin />} />

        {/* इन सबमे फिलहाल बिना सुरक्षा के डायरेक्ट एक्सेस */}
        <Route path="/admin-dashboard" element={<AdminDashboard user={null} />} />
        <Route path="/seller-dashboard" element={<SellerDashboard user={null} />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard user={null} />} />
      </Routes>
    </div>
  );
}

export default App;
