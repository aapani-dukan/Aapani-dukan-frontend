import "./style.css"; import React, { useState, useEffect } from "react"; import { BASE_URL } from "../config";

export default function SellerDashboard({ user, products, setProducts }) { const [shopName, setShopName] = useState(""); const [productName, setProductName] = useState(""); const [productPrice, setProductPrice] = useState(""); const [productDescription, setProductDescription] = useState(""); const [productImage, setProductImage] = useState(""); const [category, setCategory] = useState(""); const [subcategory, setSubcategory] = useState(""); const [editingIndex, setEditingIndex] = useState(null);

useEffect(() => { const savedProducts = JSON.parse(localStorage.getItem("products")) || []; const savedShop = localStorage.getItem("shopName") || ""; setProducts(savedProducts); setShopName(savedShop); }, [setProducts]);

useEffect(() => { localStorage.setItem("products", JSON.stringify(products)); }, [products]);

useEffect(() => { localStorage.setItem("shopName", shopName); }, [shopName]);

const handleShopRegister = async () => { alert("Shop Registered: " + shopName); // Optional: POST to backend };

const handleAddOrUpdateProduct = async () => { if (!shopName || !productName || !productPrice || !category) { alert("सभी जानकारी भरें!"); return; }

const newProduct = {
  name: productName,
  price: parseFloat(productPrice),
  description: productDescription,
  image: productImage,
  category,
  subcategory,
  shopName,
  approved: false,
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
  // Optional: POST to backend
  try {
    await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
  } catch (err) {
    console.error("Failed to send product to backend:", err);
  }
}

setProductName("");
setProductPrice("");
setProductDescription("");
setProductImage("");
setCategory("");
setSubcategory("");

};

const handleEditProduct = (index) => { const prod = products[index]; setProductName(prod.name); setProductPrice(prod.price); setProductDescription(prod.description); setProductImage(prod.image); setCategory(prod.category); setSubcategory(prod.subcategory); setEditingIndex(index); };

const handleDeleteProduct = (index) => { const confirmDelete = window.confirm("क्या आप इस प्रोडक्ट को हटाना चाहते हैं?"); if (confirmDelete) { const newList = products.filter((_, i) => i !== index); setProducts(newList); } };

return ( <div className="seller-dashboard"> <h2>Seller Dashboard</h2> <p>Welcome, <b>{user.username}</b></p> <p>यहाँ आप अपनी दुकान और प्रोडक्ट जोड़ सकते हैं।</p>

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
    <textarea
      placeholder="Product Description"
      value={productDescription}
      onChange={(e) => setProductDescription(e.target.value)}
    />
    <input
      type="text"
      placeholder="Product Image URL"
      value={productImage}
      onChange={(e) => setProductImage(e.target.value)}
    />
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">Select Category</option>
      <option value="Parchuni">Parchuni</option>
      <option value="Iron">Iron ke Saman</option>
      <option value="Construction">Construction (Sement, Gitti, Ret)</option>
      <option value="Fashion">Kapade / Fashion</option>
      <option value="Plumbing">Nal</option>
      <option value="Electric">Bijali ke Saman</option>
    </select>
    <input
      type="text"
      placeholder="Subcategory (Optional)"
      value={subcategory}
      onChange={(e) => setSubcategory(e.target.value)}
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
          <img src={prod.image} alt={prod.name} width="50" /> {prod.name} - ₹{prod.price} ({prod.shopName || "No Shop"})<br/>
          {prod.description}<br/>
          Category: {prod.category} / {prod.subcategory || "N/A"}<br/>
          Status: [{prod.approved ? "Approved" : "Pending"}]
          <button onClick={() => handleEditProduct(index)}>Edit</button>
          <button onClick={() => handleDeleteProduct(index)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
</div>

); }

