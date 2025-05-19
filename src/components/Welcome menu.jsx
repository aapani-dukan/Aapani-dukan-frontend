// src/components/WelcomeMenu.jsx

import React, { useState } from 'react';

export default function WelcomeMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>आपणी दुकान में आपका स्वागत है</h1>

      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <button
          onClick={() => setMenuVisible(!menuVisible)}
          style={{ fontSize: 24 }}
        >
          ⋮
        </button>

        {menuVisible && (
          <div
            style={{
              position: "absolute",
              right: 0,
              background: "#eee",
              border: "1px solid #ccc",
              padding: 10,
            }}
          >
            <button onClick={() => alert("Admin Login")}>Admin Login</button><br /><br />
            <button onClick={() => alert("Customer Login")}>Customer Login</button><br /><br />
            <button onClick={() => alert("Seller Login")}>Seller Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
