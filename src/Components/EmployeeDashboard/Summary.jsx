import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SummaryCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mt-10 flex items-center space-x-6">
      {/* Icon Section */}
      <div className="bg-teal-600 text-white text-4xl p-4 rounded-full">
        <FaUser />
      </div>

      {/* Text Section */}
      <div>
        <p className="text-gray-600 text-lg font-semibold">Welcome Back</p>
        <p className="text-2xl font-bold capitalize">{user.name}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
