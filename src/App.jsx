React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
        localStorage.removeItem("jwtToken");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>लोड हो रहा है...</div>;
  }

  // अगर user root path पर है "/" और login कर चुका है
  if (location.pathname === "/") {
    if (user) {
      if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
      if (user.role === "seller") return <Navigate to="/seller-dashboard" replace />;
      return <Navigate to="/customer-dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return (
    <div className="app">
      <Routes>
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
