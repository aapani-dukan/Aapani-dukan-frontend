import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

export default function AdminDashboard() {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchSellers();
    fetchProducts();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/sellers`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (res.ok) setSellers(data);
    } catch (err) {
      console.error('Failed to fetch sellers:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const approveSeller = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/sellers/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setMessage('Seller approved successfully.');
        fetchSellers();
      }
    } catch (err) {
      console.error('Failed to approve seller:', err);
    }
  };

  const approveProduct = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setMessage('Product approved successfully.');
        fetchProducts();
      }
    } catch (err) {
      console.error('Failed to approve product:', err);
    }
  };

  const handleFixAi = () => {
    alert('FixAi functionality will be implemented here.');
  };

  return (
    <div className="admin-dashboard p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <button
        onClick={handleFixAi}
        className="bg-purple-600 text-white px-4 py-2 mb-4"
      >
        FixAi
      </button>

      <div className="sellers-section mb-8">
        <h3 className="text-xl font-semibold mb-2">Sellers</h3>
        <ul>
          {sellers.map((seller) => (
            <li key={seller.id} className="mb-2">
              {seller.name} - {seller.shopName} -{' '}
              {seller.approved ? (
                <span className="text-green-600">Approved</span>
              ) : (
                <button
                  onClick={() => approveSeller(seller.id)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="products-section">
        <h3 className="text-xl font-semibold mb-2">Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-2">
              {product.name} - ₹{product.price} -{' '}
              {product.approved ? (
                <span className="text-green-600">Approved</span>
              ) : (
                <button
                  onClick={() => approveProduct(product.id)}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
