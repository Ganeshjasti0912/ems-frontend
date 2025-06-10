import React, { useEffect } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const AddSalary = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = React.useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [employees, setEmployees] = React.useState([]);
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value, // Store the input value
    }));

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://ems-backend-i0kh.onrender.com/api/salary/add/`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert("Something went wrong while adding the department.");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);

  }

  return (
    <>{departments && employees ? (
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add salary</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              onChange={handleDepartment}
              value={employee.department}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.deptName}
                </option>
              ))}
              {/* Add options dynamically later */}
            </select>
          </div>
          {/* employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee</label>
            <select
              name="employeeId"
              onChange={handleChange}

              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
              {/* Add options dynamically later */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
            <input
              type="text"
              name="basicSalary"
              placeholder="Salary"
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Allowances </label>
            <input
              type="text"
              name="allowances"
              placeholder="allowances"
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Deductions</label>
            <input
              type="text"
              name="deductions"
              placeholder="Deductions"
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pay Date</label>
            <input
              type="date"
              name="payDate"
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>



          {/* <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
            value={employee.salary}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div> */}




          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    ) : <div> Loading...</div>}</>
  );
};
export default AddSalary;