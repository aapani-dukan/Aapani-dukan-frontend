import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
