// src/pages/CustomerDashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">कस्टमर डैशबोर्ड</h1>
      <p>स्वागत है, {user?.email || "यूज़र"}!</p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        लॉगआउट करें
      </button>
    </div>
  );
}

export default CustomerDashboard;
