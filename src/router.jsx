import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/CustomerDashboard";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CustomerDashboard />} />
    </Routes>
  );
}
