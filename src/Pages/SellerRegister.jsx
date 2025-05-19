import "./style.css";
import { useState } from "react";

export default function SellerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    mobile: "",
    otp: "",
  });
  const [step, setStep] = useState("form"); // form → otp
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendOtp = async (e) => {
    e.preventDefault();
    const res = await fetch("https://aapani-dukan-backend-8.onrender.com/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: formData.mobile }),
    });

    const data = await res.json();
    if (res.ok) {
      setStep("otp");
      setMessage("OTP भेज दिया गया है। कृपया OTP दर्ज करें।");
    } else {
      setMessage(data.message || "OTP भेजने में त्रुटि हुई।");
    }
  };

  const verifyAndRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("https://aapani-dukan-backend-8.onrender.com/api/register-seller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message || "कोई उत्तर नहीं मिला");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Seller Registration</h2>

      {step === "form" && (
        <form onSubmit={sendOtp} className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full p-2 border"
            onChange={handleChange}
          />
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            required
            className="w-full p-2 border"
            onChange={handleChange}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            pattern="[0-9]{10}"
            required
            className="w-full p-2 border"
            onChange={handleChange}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Send OTP
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyAndRegister} className="space-y-2">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            required
            className="w-full p-2 border"
            onChange={handleChange}
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2">
            Verify & Register
          </button>
        </form>
      )}

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
