import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Customer Login", path: "/login" },
  { label: "Seller Login", path: "/seller-login" },
  { label: "Seller Registration", path: "/seller-register" },
];

export default function CustomerNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: "24px" }}>
        ⋮
      </button>
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: "0",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            zIndex: 10,
            minWidth: "150px",
          }}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(item.path)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
