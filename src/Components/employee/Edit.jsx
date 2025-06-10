import React, { useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = React.useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: '',
  });
  const [departments, setDepartments] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const { id } = useParams(); // Assuming you have the employee ID in the URL
  //const [formData, setFormData] = React.useState({})

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();

  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-i0kh.onrender.com/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {

          const employee = response.data.employees;
          console.log("Fetched employee:", employee); // 👈 Add this to debug shape of data
          setEmployee((prevData) => ({
            ...prevData,
            name: employee.userId?.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
          }));
        } else {
          alert("API returned success: false");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(error?.response?.data?.error || "Unexpected error");
      }
    };

    fetchEmployee();

  }, []); // This effect runs once when the component mounts

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
      const response = await axios.put(
        `https://ems-backend-i0kh.onrender.com/api/employee/${id}`,
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

  return (
    <>{departments && employee ? (
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Employee</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              value={employee.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              required
              onChange={handleChange}
              value={employee.maritalStatus}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              onChange={handleChange}
              value={employee.designation}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>



          <div>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              onChange={handleChange}
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


          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    ) : <div> Loading...</div>}</>
  );
};
export default Edit;