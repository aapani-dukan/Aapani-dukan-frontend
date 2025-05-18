import React, { useState } from 'react';
import "./style.css";
import LoginForm from "./Login";
import SellerDashboard from "./SellerDashboard";
import CustomerDashboard from "./CustomerDashboard";
import LoginDashboard from"./LoginDashboard";
function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="app">
      {user.role === "seller" ? (
        <SellerDashboard user={user} products={products} setProducts={setProducts} />
      ) : (
        <CustomerDashboard user={user} products={products} />
      )}
    </div>
  );
}

export default App;
