import "./style.css";
import React, { useState, useEffect } from "react";

export default function SellerDashboard({ user, products, setProducts }) {
  const [shopName, setShopName] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // LocalStorage से data load करना (on mount)
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedShop = localStorage.getItem("shopName") || "";
    setProducts(savedProducts);
    setShopName(savedShop);
  }, [setProducts]);

  // Products या shopName बदलने पर localStorage में save करना
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("shopName", shopName);
  }, [shopName]);

  const handleShopRegister = () => {
    alert("Shop Registered: " + shopName);
  };

  const handleAddOrUpdateProduct = () => {
    if (!shopName || !productName || !productPrice) {
      alert("सभी जानकारी भरें!");
      return;
    }

    const newProduct = {
      name: productName,
      price: productPrice,
      shopName: shopName,
      approved: false, // नया field
    };

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = { ...newProduct, approved: products[editingIndex].approved || false };
      setProducts(updatedProducts);
      alert("Product Updated!");
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
      alert("Product Added: " + productName + " ₹" + productPrice);
    }

    setProductName("");
    setProductPrice("");
  };

  const handleEditProduct = (index) => {
    const prod = products[index];
    setProductName(prod.name);
    setProductPrice(prod.price);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const confirmDelete = window.confirm("क्या आप इस प्रोडक्ट को हटाना चाहते हैं?");
    if (confirmDelete) {
      const newList = products.filter((_, i) => i !== index);
      setProducts(newList);
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard</h2>
      <p>Welcome, <b>{user.username}</b></p>
      <p>यहाँ आप अपनी दुकान और प्रोडक्ट जोड़ सकते हैं।</p>

      <div className="form-section">
        <h3>1. Register Your Shop</h3>
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <button onClick={handleShopRegister}>Register Shop</button>
      </div>

      <div className="form-section">
        <h3>{editingIndex !== null ? "2. Edit Product" : "2. Add Product"}</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button onClick={handleAddOrUpdateProduct}>
          {editingIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </div>

      <div className="product-list">
        <h3>Added Products:</h3>
        <ul>
          {products.map((prod, index) => (
            <li key={index}>
              {prod.name} - ₹{prod.price} ({prod.shopName || "No Shop"}) [{prod.approved ? "Approved" : "Pending"}]
              &nbsp;
              <button onClick={() => handleEditProduct(index)}>Edit</button>
              <button onClick={() => handleDeleteProduct(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
