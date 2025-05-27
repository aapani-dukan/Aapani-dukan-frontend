import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useAuthToken() {
  const [customerMobile, setCustomerMobile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload?.uid) {
          localStorage.setItem("loggedInCustomer", payload.uid);
          setCustomerMobile(payload.uid);
        }
      } catch (error) {
        console.error("Token decode error:", error);
      }
    } else {
      const uid = localStorage.getItem("loggedInCustomer");
      if (uid) setCustomerMobile(uid);
    }
  }, [location.search]);

  return { customerMobile };
