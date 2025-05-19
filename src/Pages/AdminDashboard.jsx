import React, { useEffect, useState } from "react";

export default function AdminDashboard({ products, setProducts }) {
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    const unapproved = products.filter((p) => !p.approved);
    setPendingProducts(unapproved);
  }, [products]);

  const handleApprove = (index) => {
    const productToApprove = pendingProducts[index];
    const updatedProducts = products.map((prod) =>
      prod.name === productToApprove.name &&
      prod.price === productToApprove.price &&
      prod.shopName === productToApprove.shopName
        ? { ...prod, approved: true }
        : prod
    );
    setProducts(updatedProducts);
    alert("Product Approved: " + productToApprove.name);
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin!</h2>
      <p>Here you will manage seller requests and orders.</p>
      <h3>Pending Products for Approval</h3>

      {pendingProducts.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        pendingProducts.map((product, index) => (
          <div className="seller-card" key={index}>
            <p>
              <strong>Product:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Shop:</strong> {product.shopName}
            </p>
            <button onClick={() => handleApprove(index)}>Approve</button>
          </div>
        ))
      )}
    </div>
  );
}
