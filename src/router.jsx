import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/CustomerDashboard";
import AuthCallback from "./pages/AuthCallback"; // अगर आप callback भी चाहते हैं

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CustomerDashboard />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
    </Routes>
  );
}
