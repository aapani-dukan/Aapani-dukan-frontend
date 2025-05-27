import { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function useCart(customerMobile) {
  const [cart, setCart] = useState([]);
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

    const res = await fetch(`${BASE_URL}/place-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      alert(`Order placed successfully via ${paymentMethod}`);
      setCart([]);
    } else {
      alert("Order failed");
    }
  };

  return { cart, addToCart, totalPrice, handleBuy };
}
