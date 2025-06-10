import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="w-full bg-teal-600 text-white py-2 rounded" onClick={handleReset}>
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
