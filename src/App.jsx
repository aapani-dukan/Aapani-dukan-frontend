nimport React, { useState } from 'react';
import './pages/style.css';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import WelcomeMenu from './components/WelcomeMenu'; // Adjusted path
<>
  <Route path="/admin8404-login" element={<AdminLogin />} />
  <Route path="/admin-dashboard" element={
    !user ? (
      <Navigate to="/admin8404-login" replace />
    ) : (
      <AdminDashboard user={user} />
    )
  } />
</>
function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
<Route path="/admin8404-login" element={<AdminLogin />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
  
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
