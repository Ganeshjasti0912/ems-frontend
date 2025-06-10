import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams(); // use 'id' not '__id'
  const [department, setDepartment] = useState({ deptName: "", description: "" });
  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Response from API:", response.data);

        if (response.data.success) {
          setDepartment(response.data.department);
        } else {
          alert("API returned success: false");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(error?.response?.data?.error || "Unexpected error");
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://ems-backend-i0kh.onrender.com/api/department/${id}`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        alert("Department updated successfully");
      } else {
        alert("Failed to update department");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return depLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="deptName" className="block text-sm font-medium text-gray-700 mb-1">
            Department Name
          </label>
          <input
            type="text"
            id="deptName"
            name="deptName"
            value={department.deptName}
            onChange={handleChange}
            placeholder="Enter Department Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-teal-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Enter Department Description"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-teal-500"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
        >
          Edit Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
