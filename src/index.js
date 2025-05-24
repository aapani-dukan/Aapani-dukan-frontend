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
      {/* App के अंदर अपने आप /customer-dashboard पर redirect हो जाएगा */}
      <Route path="/*" element={<App />} />
      
      {/* AI Fix के लिए अलग रूट */}
      <Route path="/fix" element={<AiFix />} />
    </Routes>
  </Router>
);
