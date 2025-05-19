import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import AiFix from "./AiFix";

function MainApp() {
  return (
    <div>
      <AiFix />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<MainApp />);
