import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function AdminDashboard() {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);

  // Initial fetch for pending sellers and products
  useEffect(() => {
    fetch(`${BASE_URL}/pending-sellers`)
      .then((res) => res.json())
      .then((data) => setPendingSellers(data))
      .catch((err) => console.error("Seller fetch error:", err));

    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setPendingProducts(data.filter((p) => !p.approved)))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  const approveSeller = async (mobile) => {
    await fetch(`${BASE_URL}/approve-seller`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    setPendingSellers((prev) => prev.filter((s) => s.mobile !== mobile));
    alert("Seller Approved: " + mobile);
  };

  const rejectSeller = async (mobile) => {
    await fetch(`${BASE_URL}/reject-seller`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    setPendingSellers((prev) => prev.filter((s) => s.mobile !== mobile));
    alert("Seller Rejected: " + mobile);
  };

  const handleApproveProduct = async (product) => {
    await fetch(`${BASE_URL}/approve-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setPendingProducts((prev) =>
      prev.filter((p) => p.name !== product.name || p.mobile !== product.mobile)
    );
    alert("Product Approved: " + product.name);
  };

  const handleRejectProduct = async (product) => {
    await fetch(`${BASE_URL}/reject-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setPendingProducts((prev) =>
      prev.filter((p) => p.name !== product.name || p.mobile !== product.mobile)
    );
    alert("Product Rejected: " + product.name);
  };

  const handleUpdateProduct = async (product, updatedFields) => {
    const updatedProduct = { ...product, ...updatedFields };

    await fetch(`${BASE_URL}/update-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    alert("Updated Product: " + product.name);
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin!</h2>

      <h3>Pending Sellers</h3>
      {pendingSellers.length === 0 ? (
        <p>No pending sellers.</p>
      ) : (
        pendingSellers.map((seller, index) => (
          <div key={index} className="seller-card">
            <p><strong>Shop:</strong> {seller.shopName}</p>
            <p><strong>Mobile:</strong> {seller.mobile}</p>
            <button onClick={() => approveSeller(seller.mobile)}>Approve</button>
            <button onClick={() => rejectSeller(seller.mobile)}>Reject</button>
          </div>
        ))
      )}

      <h3>Pending Products</h3>
      {pendingProducts.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        pendingProducts.map((product, index) => (
          <div key={index} className="product-card">
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Shop:</strong> {product.shopName}</p>
            <input
              type="number"
              placeholder="Discount %"
              onChange={(e) => product.discount = Number(e.target.value)}
            />
            <input
              type="number"
              placeholder="Delivery Charge ₹"
              onChange={(e) => product.deliveryCharge = Number(e.target.value)}
            />
            <button onClick={() => handleApproveProduct(product)}>Approve</button>
            <button onClick={() => handleRejectProduct(product)}>Reject</button>
            <button onClick={() => handleUpdateProduct(product, {
              discount: product.discount || 0,
              deliveryCharge: product.deliveryCharge || 0
            })}>
              Update Info
            </button>
          </div>
        ))
      )}
    </div>
  );
}
