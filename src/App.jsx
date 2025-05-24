import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import SellerRegister from "./pages/SellerRegister";
import SellerDashboard from "./pages/SellerDashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded = JSON.parse(atob(token)); // simulate decode
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
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/seller-register" replace />} />

      <Route path="/seller-register" element={<SellerRegister />} />
      
      <Route
        path="/seller-dashboard"
        element={
          user && user.role === "seller" ? (
            <SellerDashboard user={user} />
          ) : (
            <Navigate to="/seller-register" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
