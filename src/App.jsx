import React, { useEffect, useState } from "react";

function CustomerDashboard({ user }) {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const name = user?.email?.split("@")[0] || "Customer";
    setWelcomeMessage(`नमस्ते, ${name}!`);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer Dashboard</h1>
        <p className="text-gray-700 mb-4">{welcomeMessage}</p>
        <p className="text-gray-600">Email: {user?.email || "Unknown"}</p>
      </div>
    </div>
  );
}

export default CustomerDashboard;
