import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router"; // ध्यान दें: path सही रखें

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
