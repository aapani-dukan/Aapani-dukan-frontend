// Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase"; // ये वही फाइल जहां आपने firebase config डाला है
import "./style.css";

export default function Login() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    // अगर पहले से लॉगिन है तो डायरेक्ट नेविगेट कर दें
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/dashboard");  // अपनी डैशबोर्ड की path यहाँ डालें
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    setError("");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert(`स्वागत है, ${user.displayName}`);
        navigate("/dashboard");  // अपनी डैशबोर्ड की path यहाँ डालें
      })
      .catch((err) => {
        console.error(err);
        setError("लॉगिन में समस्या आई, कृपया पुनः प्रयास करें");
      });
  };

  return (
    <div className="login-form">
      <h2>Google से लॉगिन करें</h2>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <button onClick={handleGoogleLogin} className="google-login-btn">
        Google Login
      </button>
    </div>
  );
}
