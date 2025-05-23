import React from "react";

function CustomerDashboard({ user }) {
  return (
    <div>
      <h1>Welcome to Customer Dashboard</h1>
      <p>User Email: {user?.email || "No User"}</p>
    </div>
  );
}

export default CustomerDashboard;
