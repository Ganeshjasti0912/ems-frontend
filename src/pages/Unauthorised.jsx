import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-600 text-center">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-6 text-lg">You do not have permission to view this page.</p>
      <button
        onClick={handleLoginRedirect}
        className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;
