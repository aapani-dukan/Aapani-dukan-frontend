import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCustomerToken from "../hooks/useCustomerToken";
import useProducts from "../hooks/useProducts";
import useCustomerOrders from "../hooks/useCustomerOrders";

import ProductList from "../components/ProductList";
import CartSummary from "../components/CartSummary";
import OrderHistory from "../components/OrderHistory";

const menuItems = [
  { label: "Customer Login", path: "/login" },
  { label: "Seller Login", path: "/seller-login" },
  { label: "Seller Registration", path: "/seller-register" },
];

const menuItemStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  color: "black",
  backgroundColor: "white",
};

export default function CustomerDashboard() {
  useCustomerToken();

  const products = useProducts();

  const customerMobile = localStorage.getItem("loggedInCustomer");

  const [orders, setOrders] = useCustomerOrders(customerMobile);

  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  const handleBuy = async () => {
    if (!customerMobile) {
      alert("कृपया पहले लॉगिन करें");
      navigate("/login");
      return;
    }

    const paymentMethod = window.prompt("पेमेंट मोड चुनें: pay या cod");
    if (!paymentMethod) return;

    const order = {
      mobile: customerMobile,
      items: cart,
      total: totalPrice,
      payment: paymentMethod,
      status: "Pending",
      time: new Date().toISOString(),
    };

    const res = await fetch(`${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/place-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      alert(`Order placed successfully via ${paymentMethod}`);
      setCart([]);
      // Refresh orders
      const updated = await fetch(`${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/orders?mobile=${customerMobile}`);
      const data = await updated.json();
      setOrders(data);
    } else {
      alert("Order failed");
    }
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="dashboard" style={{ position: "relative", padding: "20px" }}>
      <div className="header">
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: "24px" }}>
            ⋮
          </button>
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "35px",
                right: "0",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                zIndex: 10,
                minWidth: "150px",
              }}
            >
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(item.path)}
                  style={menuItemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <h2>Customer Dashboard</h2>
      </div>

      <ProductList products={products} addToCart={addToCart} />

      <CartSummary cart={cart} totalPrice={totalPrice} handleBuy={handleBuy} />

      <OrderHistory orders={orders} />
    </div>
  );
}
