export const handleGoogleLogin = () => {
  try {
    // Backend OAuth route पर redirect करें
    window.location.href = "https://aapani-dukan-backend-11.onrender.com/auth/google";
  } catch (error) {
    console.error("Login failed:", error);
    alert("Google login में समस्या आई, कृपया पुनः प्रयास करें।");
  }
};
