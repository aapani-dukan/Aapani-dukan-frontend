import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("https://aapani-dukan-backend-11.onrender.com/auth/google/callback", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.token && typeof data.token === "string") {
          localStorage.setItem("jwtToken", data.token);
          navigate("/"); // Login successful → redirect to dashboard
        } else {
          console.error("Invalid or missing token from backend:", data);
          navigate("/login");
        }
      } catch (err) {
        console.error("Callback failed:", err);
        navigate("/login");
      }
    };

    getToken();
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default AuthCallback;
