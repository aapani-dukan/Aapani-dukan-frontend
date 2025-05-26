import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // अगर पहले से token है, तो सीधे डैशबोर्ड पर जाएं
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/customer-dashboard");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    setError("");
    try {
      // Backend के Google OAuth endpoint पर redirect करें
      window.location.href = "https://aapani-dukan-backend-11.onrender.com/auth/google";
    } catch (err) {
      console.error(err);
      setError("लॉगिन में समस्या आई, कृपया पुनः प्रयास करें");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Google से लॉगिन करें</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}
      <button onClick={handleGoogleLogin}>Google Login</button>
    </div>
  );
}
