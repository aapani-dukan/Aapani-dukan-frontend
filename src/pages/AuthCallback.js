// src/pages/AuthCallback.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("https://your-backend.com/auth/google/callback", {
          credentials: "include", // अगर cookie में JWT भेजा जा रहा है
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          console.error("Token not received");
        }
      } catch (err) {
        console.error("Callback failed:", err);
      }
    };
    getToken();
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default AuthCallback;
