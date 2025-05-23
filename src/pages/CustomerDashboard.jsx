import React, { useState } from "react";

export default function CustomerDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Customer Login", path: "/login" },
    { label: "Seller Login", path: "/seller-login" },
    { label: "Seller Registration", path: "/seller-register" },
  ];

  const handleNavigate = (path) => {
    alert(`Navigate to ${path}`);
    setMenuOpen(false);
  };

  return (
    <div style={{ position: "relative", padding: "20px", fontSize: "18px" }}>
      <h2>Customer Dashboard</h2>

      {/* Three Dot Menu */}
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: "28px", background: "none", border: "none", cursor: "pointer" }}>
          ⋮
        </button>

        {menuOpen && (
          <div style={{
            position: "absolute",
            top: "35px",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            minWidth: "180px",
            zIndex: 999
          }}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigate(item.path)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  backgroundColor: "white"
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
