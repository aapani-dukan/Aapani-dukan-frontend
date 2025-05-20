// Login.jsx
import "./style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("customer");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOTP, setSentOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    setError("");
    if (mobile.length === 10) {
      const demoOTP = "123456";
      setSentOTP(demoOTP);
      alert("OTP भेजा गया (डेमो: 123456)");
    } else {
      setError("सही मोबाइल नंबर दर्ज करें");
    }
  };

  const handleLogin = () => {
    setError("");

    if (role === "customer") {
      if (otp === sentOTP && mobile.length === 10) {
        localStorage.setItem("loggedInCustomer", mobile);
        alert("कस्टमर लॉगिन सफल!");
        navigate("/customer-dashboard");
      } else {
        setError("गलत OTP या मोबाइल नंबर");
      }
      return;
    }

    if (role === "seller") {
      const registered = localStorage.getItem("registeredSeller");
      if (otp === sentOTP && mobile === registered) {
        localStorage.setItem("loggedInSeller", mobile);
        alert("सेलर लॉगिन सफल!");
        navigate("/seller-dashboard");
      } else {
        setError("गलत मोबाइल नंबर या OTP");
      }
      return;
    }
  };

  return (
    <div className="login-form">
      <h2>
        {role === "seller" ? "सेलर लॉगिन" : "कस्टमर लॉगिन"}
      </h2>

      <div>
        <label>
          <input
            type="radio"
            value="customer"
            checked={role === "customer"}
            onChange={(e) => setRole(e.target.value)}
          />
          Customer
        </label>
        <label>
          <input
            type="radio"
            value="seller"
            checked={role === "seller"}
            onChange={(e) => setRole(e.target.value)}
          />
          Seller
        </label>
      </div>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      <>
        <input
          type="text"
          placeholder="मोबाइल नंबर"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button onClick={handleSendOTP}>OTP भेजें</button>
        <input
          type="text"
          placeholder="OTP दर्ज करें"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleLogin}>लॉगिन करें</button>
      </>
    </div>
  );
}
