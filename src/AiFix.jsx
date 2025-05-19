import React, { useState } from "react";

function AiFix() {
  const [status, setStatus] = useState("...");

  async function fixAllCode() {
    setStatus("Running maintenance... Please wait...");
    try {
      const res = await fetch("/run-maintenance");
      const text = await res.text();
      setStatus(text);
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f9f9f9",
        padding: "20px",
        color: "#333",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#444" }}>AI Auto Code Fixer</h2>
      <p>
        नीचे दिए गए बटन पर क्लिक करें, AI आपकी सारी कोड फाइलें चेक कर फिक्स कर देगा।
      </p>
      <button
        onClick={fixAllCode}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "15px 25px",
          marginTop: "20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Run AI Code Fixer
      </button>
      <p style={{ marginTop: "20px", fontStyle: "italic" }}>{status}</p>
    </div>
  );
}

export default AiFix;
