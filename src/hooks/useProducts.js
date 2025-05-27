{ useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((p) => p.approved);
        setProducts(approved);
      })
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  return products;
