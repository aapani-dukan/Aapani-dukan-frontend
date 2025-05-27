import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function useCustomerOrders(customerMobile) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (customerMobile) {
      fetch(`${BASE_URL}/orders?mobile=${customerMobile}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error("Orders fetch error:", err));
    }
  }, [customerMobile]);

  return [orders, setOrders];
}
