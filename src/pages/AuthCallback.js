import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token); // Change done here
      navigate("/customer-dashboard"); // Changed from /login to /customer-dashboard
    } else {
      console.error("Token not found in callback");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Processing login...</div>;
}

export default AuthCallback;
