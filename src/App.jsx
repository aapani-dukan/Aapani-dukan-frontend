import React, { useState, useEffect } from "react";
import SellerDashboard from "./pages/SellerDashboard";
import SellerRegister from "./SellerRegister";
import Login from "./Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // Check if user is logged in (localStorage या कोई लॉजिक)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="app-container">
      {!user && (
        <>
          <Login onLogin={handleLogin} />
          <hr />
          <SellerRegister />
        </>
      )}

      {user && (
        <>
          <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>
            Logout
          </button>
          <SellerDashboard user={user} products={products} setProducts={setProducts} />
        </>
      )}
    </div>
  );
}
