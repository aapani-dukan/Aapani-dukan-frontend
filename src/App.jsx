import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  const [user, setUser] = useState(null);

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
    }
  }, []);

  return (
    <Routes>
      {/* App खुलते ही customer-dashboard पर redirect होगा */}
      <Route path="/" element={<Navigate to="/customer-dashboard" replace />} />

      {/* Customer Dashboard */}
      <Route path="/customer-dashboard" element={<CustomerDashboard user={user} />} />
    </Routes>
  );
}

export default App;
