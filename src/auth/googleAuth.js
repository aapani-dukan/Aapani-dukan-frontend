// src/auth/googleAuth.js

export const handleGoogleLogin = async () => {
  try {
    // Open Google OAuth popup via backend
    window.location.href = "https://aapani-dukan-backend-11.onrender.com/auth/google";
  } catch (error) {
    console.error("Login failed:", error);
  }
};
// authRoutes.js या index.js जैसी किसी backend फाइल में
const express = require("express");
const passport = require("passport");

const router = express.Router();

// ये route Google OAuth callback handle करेगा
router.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication
 res.redirect("https://aapani-dukan-frontend-4444.vercel.app/CustomerDashboard");
  }
);

module.exports = router;
