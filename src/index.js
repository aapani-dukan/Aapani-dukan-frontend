import React from "react";
import './index.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";        // यह आपका पूरा ऐप (Login आदि) है
import AiFix from "./AiFix";    // AI Fix Page

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/fix" element={<AiFix />} />
    </Routes>
  </Router>
);
