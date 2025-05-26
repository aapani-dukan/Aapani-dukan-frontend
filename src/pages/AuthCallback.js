import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);
      navigate("/CustomerDashboard"); // या जो भी पेज आप दिखाना चाहते हैं
    } else {
      console.error("Token missing in callback URL");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Login complete. Redirecting...</div>;
};

export default AuthCallback;
