import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const columns = [
  {
    name: 'S No',
    selector: row => row.sno,
  },
  {
    name: 'Department Name',
    selector: row => row.deptName,
    sortable: true,
  },
  {
    name: 'Action',
    selector: row => row.action,
  },
];

const DepartmentButtons = ({ __id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      // const response = await axios.delete(`http://localhost:3000/api/department/${__id}`, {
        const response = await axios.delete(`https://ems-backend-i0kh.onrender.com/api/department/${__id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        alert("Department deleted successfully");
        onDepartmentDelete(__id); // Inform parent to update UI
      } else {
        alert("Failed to delete department");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert(error?.response?.data?.error || "Unexpected error");
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => navigate(`/admin-dashboard/departments/${__id}`)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default DepartmentButtons;
