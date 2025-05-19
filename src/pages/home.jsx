import * as React from "react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", textAlign: "center", background: "linear-gradient(to bottom, #fff8e1, #ffe0b2)", color: "#4e342e" }}>
      <header style={{ backgroundColor: "#ffcc80", padding: "20px 10px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
        <h1 style={{ margin: 0, fontSize: "2.5rem", fontFamily: "'Georgia', serif" }}>आपणी दुकान</h1>
        <div style={{ padding: 20, fontSize: "1.1rem", maxWidth: 600, margin: "auto", fontStyle: "italic" }}>
          राजस्थान की खुशबू और परंपरा से जुड़ा एक डिजिटल बाज़ार जहाँ हर ग्राहक को मिलता है अपना मनपसंद सामान – सीधे विक्रेता से!
        </div>
      </header>

      <section style={{ backgroundColor: "#fff3e0", padding: "30px 10px", borderTop: "2px solid #ffb74d" }}>
        <h2 style={{ color: "#bf360c", marginBottom: 20 }}>लॉगिन करें</h2>
        <Link href="/customer-login">
          <a style={{ display: "inline-block", margin: "20px auto", padding: "15px 30px", backgroundColor: "#f57c00", color: "white", fontSize: "1.2rem", textDecoration: "none", borderRadius: 8, transition: "background-color 0.3s ease" }}>
            Login
          </a>
        </Link>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: 20, gap: 20 }}>
        {[
          { name: "चाय पत्ती", img: "https://i.imgur.com/xJ0mHPY.png" },
          { name: "शक्कर", img: "https://i.imgur.com/jS6zPDa.png" },
          { name: "सरसों तेल", img: "https://i.imgur.com/7XBzv3H.png" },
          { name: "नमक", img: "https://i.imgur.com/qMHltjV.png" },
          { name: "अरहर दाल", img: "https://i.imgur.com/IUB4Vdq.png" }
        ].map((product, index) => (
          <div key={index} style={{ background: "white", borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.1)", width: 150, padding: 10 }}>
            <img src={product.img} alt={product.name} style={{ width: 100, height: 100, objectFit: "contain", marginBottom: 10 }} />
            <p style={{ margin: 0, fontWeight: "bold" }}>{product.name}</p>
          </div>
        ))}
      </section>

      <footer style={{ marginTop: 40, fontSize: "0.9rem", color: "#6d4c41" }}>
        &copy; 2025 Aapani Dukan | Made with love in Rajasthan
      </footer>
    </div>
  );
}
