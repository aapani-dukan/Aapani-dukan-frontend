import React, { useState } from 'react';
import './style.css';
import Login from './Login';
import SellerDashboard from './SellerDashboard';
import CustomerDashboard from './CustomerDashboard';
import WelcomeMenu from './components/WelcomeMenu'; // Adjusted path

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  if (!user) {
    return (
      <div className="app">
        <WelcomeMenu />
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className="app">
      {user.role === 'seller' ? (
        <SellerDashboard user={user} products={products} setProducts={setProducts} />
      ) : (
        <CustomerDashboard user={user} products={products} />
      )}
    </div>
  );
}

export default App;
