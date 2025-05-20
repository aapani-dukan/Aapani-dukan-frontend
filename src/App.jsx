import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './pages/style.css';

import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WelcomeMenu from './components/WelcomeMenu';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  return (
    <div className="app">
      <Routes>
        <Route path="/admin8404-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            !user ? (
              <Navigate to="/admin8404-login" replace />
            ) : (
              <AdminDashboard user={user} />
            )
          }
        />
      </Routes>

      {!user ? (
        <>
          <WelcomeMenu />
          <Login onLogin={setUser} />
        </>
      ) : user.role === 'seller' ? (
        <SellerDashboard user={user} products={products} setProducts={setProducts} />
      ) : (
        <CustomerDashboard user={user} products={products} />
      )}
    </div>
  );
}

export default App;
