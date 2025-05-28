import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import useAuthToken from "../hooks/useAuthToken";

export default function CustomerDashboard() {
  const { customerMobile } = useAuthToken(); // 🔁 Updated to use hook value

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((p) => p.approved);
        setProducts(approved);
      })
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  useEffect(() => {
    if (customerMobile) {
      fetch(`${BASE_URL}/orders?mobile=${customerMobile}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Orders fetch error:", err));
    }
  }, [customerMobile]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
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
      const updated = await fetch(`${BASE_URL}/orders?mobile=${customerMobile}`);
      const data = await updated.json();
      setOrders(data);
    } else {
      alert("Order failed");
    }
  };

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
            <li key={idx}>
              {item.name} - ₹{item.price}
            </li>
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
                  <li key={i}>
                    {item.name} - ₹{item.price}
                  </li>
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
