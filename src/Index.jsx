import React from "react";
import Apl from "./App"
import { createRoot } from "react-dom/client";
import AiFix from "./AiFix";

function App() {
  return (
    <div>
      <AiFix />
    </div>
  );
}


const root = createRoot(document.getElementById("root"));
root.render(<App />);
