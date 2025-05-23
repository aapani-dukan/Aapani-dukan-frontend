import React, { useEffect } from "react";

function CustomerDashboard({ user }) {
  useEffect(() => {
    console.log("Customer Dashboard Loaded");
  }, []);

  return (
    <div>
      <h1>Welcome to Customer Dashboard</h1>
      <p>User Email: {user?.email || "No User"}</p>
    </div>
  );
}

export default CustomerDashboard;
