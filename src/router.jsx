import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "../pages/CustomerDashboard";
import About from "../pages/about";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CustomerDashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
    </Routes>
  );
}
