import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

import CustomerDashboard from "./pages/CustomerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import SellerRegister from "./pages/SellerRegister";
import Login from "./pages/Login";

export default function Router() {
  return (
    <Routes>
      {/* App खुलते ही यह डैशबोर्ड खुलेगा */}
      <Route path="/" element={<CustomerDashboard />} />

      {/* बाकी पेज */}
      <Route path="/home" element={<Home />} />
      <Route 
      <Route path="/login" element={<Login />} />
      <Route path="/seller-register" element={<SellerRegister />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
    </Routes>
  );
}
