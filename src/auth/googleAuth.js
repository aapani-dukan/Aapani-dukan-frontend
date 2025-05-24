// src/auth/googleAuth.js

export const handleGoogleLogin = async () => {
  try {
    // Open Google OAuth popup via backend (e.g. `/auth/google`)
    window.location.href = "https://aapani-dukan-backend-11.onrender.com

      /auth/google";
  } catch (error) {
    console.error("Login failed:", error);
  }
};
