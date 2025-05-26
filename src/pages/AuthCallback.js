import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("jwtToken");

    if (token) {
      localStorage.setItem("jwtToken", token);
      navigate("/customer-dashboard");
    } else {
      console.error("Token missing in callback URL");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      Login complete. Redirecting...
    </div>
  );
};

export default AuthCallback;
