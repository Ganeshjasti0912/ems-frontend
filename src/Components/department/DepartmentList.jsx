import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper'; // adjust path if needed
import DepartmentButtons from '../../utils/DepartmentHelper'; // adjust path if needed

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filterDepartments, setFilterDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map(dep => ({
          __id: dep._id,
          sno: sno++,
          deptName: dep.deptName,
          action: (
            <DepartmentButtons
              __id={dep._id}
              onDepartmentDelete={handleDepartmentDelete}
            />
          )
        }));
        setDepartments(data);
        setFilterDepartments(data); // Initialize filter with all departments
      } else {
        alert("API returned success: false");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert(error?.response?.data?.error || "Unexpected error");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDepartmentDelete = (__id) => {
    fetchDepartments(); // Refresh the list after deletion
  };

  const handleFilterDepartments = (e) => {
    const records = departments.filter(dep =>
      dep.deptName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterDepartments(records);
  }

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Dept Name"
          className="px-4 py-0.5 border rounded"
          onChange={handleFilterDepartments}
        />
        <Link
          to="/admin-dashboard/departments/add-department"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Add New Department
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={filterDepartments}
        pagination
      />
    </div>
  );
};

export default DepartmentList;
