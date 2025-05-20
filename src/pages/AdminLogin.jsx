import React, { useState } from 'react';
import { BASE_URL } from '../config';

export default function AdminLogin({ setAdminToken }) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('form');
  const [message, setMessage] = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setMessage('OTP भेज दिया गया है। कृपया OTP दर्ज करें।');
      } else {
        setMessage(data.message || 'OTP भेजने में त्रुटि हुई।');
      }
    } catch (err) {
      setMessage('सर्वर से कनेक्शन नहीं हो पाया।');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/admin-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        setMessage('लॉगिन सफल!');
      } else {
        setMessage(data.message || 'OTP सत्यापन विफल।');
      }
    } catch (err) {
      setMessage('सर्वर से कनेक्शन नहीं हो पाया।');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Admin Login</h2>
      {step === 'form' && (
        <form onSubmit={sendOtp} className="space-y-2">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            pattern="[0-9]{10}"
            required
            className="w-full p-2 border"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Send OTP
          </button>
        </form>
      )}
      {step === 'otp' && (
        <form onSubmit={verifyOtp} className="space-y-2">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            required
            className="w-full p-2 border"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2">
            Verify & Login
          </button>
        </form>
      )}
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
