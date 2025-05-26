import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Change done here
    if (token) {
      navigate("/customer-dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = "https://aapani-dukan-backend-4444.vercel.app/auth/google";
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
