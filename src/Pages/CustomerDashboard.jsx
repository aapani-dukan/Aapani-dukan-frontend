// CustomerDashboard.jsx import React, { useEffect, useState } from "react"; import { useNavigate } from "react-router-dom"; import "./CustomerDashboard.css";

export default function CustomerDashboard() { const [products, setProducts] = useState([]); const [cart, setCart] = useState([]); const [menuOpen, setMenuOpen] = useState(false); const navigate = useNavigate();

useEffect(() => { // Dummy products - Replace with real API later setProducts([ { id: 1, name: "Product A", price: 150, img: "https://via.placeholder.com/100" }, { id: 2, name: "Product B", price: 250, img: "https://via.placeholder.com/100" }, { id: 3, name: "Product C", price: 350, img: "https://via.placeholder.com/100" }, ]); }, []);

const addToCart = (product) => { setCart((prev) => [...prev, product]); };

const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

const handleBuy = () => { const isLoggedIn = localStorage.getItem("loggedInCustomer"); if (!isLoggedIn) { alert("कृपया पहले लॉगिन करें"); navigate("/login"); } else { const paymentMethod = window.prompt("पेमेंट मोड चुनें: pay या cod"); if (paymentMethod) { alert(Order placed successfully via ${paymentMethod}); setCart([]); } } };

return ( <div className="dashboard"> <div className="header"> <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}> ⋮ </div> {menuOpen && ( <div className="menu"> <div onClick={() => navigate("/login")}>Customer Login</div> <div onClick={() => navigate("/seller-login")}>Seller Login</div> <div onClick={() => navigate("/admin-login")}>Admin Login</div> </div> )} <h2>Customer Dashboard</h2> </div>

<div className="product-list">
    {products.map((product) => (
      <div className="product-card" key={product.id}>
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
</div>

); }

          
