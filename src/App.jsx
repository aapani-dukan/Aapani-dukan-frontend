import React, { useEffect, useState } from "react";

function CustomerDashboard({ user }) {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const name = user?.email?.split("@")[0] || "Customer";
    setWelcomeMessage(`नमस्ते, ${name}!`);

    // Dummy product data
    setProducts([
      { id: 1, name: "सेब", price: "₹120/kg" },
      { id: 2, name: "आलू", price: "₹25/kg" },
      { id: 3, name: "प्याज", price: "₹30/kg" },
    ]);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Customer Dashboard</h1>
        <p className="text-gray-700 mb-4">{welcomeMessage}</p>

        <h2 className="text-xl font-semibold mb-2">उत्पाद सूची:</h2>
        <ul className="space-y-3 mb-4">
          {products.map((product) => (
            <li key={product.id} className="border p-3 rounded bg-gray-50">
              <div className="text-lg font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">{product.price}</div>
            </li>
          ))}
        </ul>

        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          लॉगआउट
        </button>
      </div>
    </div>
  );
}

export default CustomerDashboard;
