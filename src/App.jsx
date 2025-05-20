import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Example: role को Firebase से या user profile से लाना होगा, अभी hardcoded है
        // जरूरत हो तो Firestore या Realtime DB से role fetch करें
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: "customer", // example role, इसको अपने logic से replace करें
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>लोड हो रहा है...</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin8404-login"
          element={<AdminLogin />}
        />
        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard user={user} />
            ) : (
              <Navigate to="/admin8404-login" replace />
            )
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller-dashboard"
          element={
            user && user.role === "seller" ? (
              <SellerDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer-dashboard"
          element={
            user && user.role === "customer" ? (
              <CustomerDashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "seller" ? (
                <Navigate to="/seller-dashboard" replace />
              ) : (
                <Navigate to="/customer-dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
