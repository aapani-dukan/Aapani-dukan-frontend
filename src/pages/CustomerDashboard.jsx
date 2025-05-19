import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import "./CustomerDashboard.css";

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const customerMobile = localStorage.getItem("loggedInCustomer");

  useEffect(() => {
    // Approved products लाएं
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((p) => p.approved);
        setProducts(approved);
      })
      .catch((err) => console.error("Product fetch error:", err));

    // Order history भी लाएं
    if (customerMobile) {
      fetch(`${BASE_URL}/orders?mobile=${customerMobile}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Orders fetch error:", err));
    }
  }, [customerMobile]);

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

    const res = await fetch(`${BASE_URL}/place-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      alert(`Order placed successfully via ${paymentMethod}`);
      setCart([]);
      // Refresh orders
      const updated = await fetch(`${BASE_URL}/orders?mobile=${customerMobile}`);
      const data = await updated.json();
      setOrders(data);
    } else {
      alert("Order failed");
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>⋮</div>
        {menuOpen && (
          <div className="menu">
            <div onClick={() => navigate("/login")}>Customer Login</div>
            <div onClick={() => navigate("/seller-login")}>Seller Login</div>
            <div onClick={() => navigate("/admin-login")}>Admin Login</div>
          </div>
        )}
        <h2>Customer Dashboard</h2>
      </div>

      <div className="product-list">
        <h3>Products</h3>
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.img} alt={product.name} />
            <h4>{product.name}</h4>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Bucket</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Bucket Items: {cart.length}</h3>
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} - ₹{item.price}</li>
          ))}
        </ul>
        <h4>Total: ₹{totalPrice}</h4>
        {cart.length > 0 && <button onClick={handleBuy}>Buy</button>}
      </div>

      <div className="order-history">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="order-card">
              <p><strong>Date:</strong> {new Date(order.time).toLocaleString()}</p>
              <p><strong>Payment:</strong> {order.payment}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - ₹{item.price}</li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
