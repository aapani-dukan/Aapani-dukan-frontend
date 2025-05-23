import React, { useEffect } from "react";

function CustomerDashboard({ user }) {
  useEffect(() => {
    console.log("Customer Dashboard Loaded");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Customer Dashboard</h1>
        <p className="text-gray-700">User Email: {user?.email || "No User"}</p>
      </div>
    </div>
  );
}

export default CustomerDashboard;
