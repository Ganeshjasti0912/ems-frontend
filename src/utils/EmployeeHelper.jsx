import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns = [
  {
    name: 'S No',
    selector: row => row.sno,
    width: '70px',
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Image',
    selector: row => row.profileImage,
    width: '90px',
  },
  {
    name: 'Department',
    selector: row => row.deptName,
    width: '120px',
  },
  {
    name: 'DOB',
    selector: row => row.dob,
    sortable: true,
    width: '130px',
  },
  {
    name: 'Action',
    selector: row => row.action,
    //center: true,
  },
];


export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('https://ems-backend-i0kh.onrender.com/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;

    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    alert(error?.response?.data?.error || "Unexpected error");
  }
  return departments;
};

// employees for salary form

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`https://ems-backend-i0kh.onrender.com/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;

    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    alert(error?.response?.data?.error || "Unexpected error");
  }
  return employees;
};


export const EmployeeButtons = ({ __id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center space-x-2">
      <button className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700"
        onClick={() => navigate(`/admin-dashboard/employees/${__id}`)}>View</button>
      <button className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${__id}`)}>Edit</button>
      <button className="px-3 py-1 rounded text-white bg-yellow-600 hover:bg-yellow-700"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${__id}`)}>Salary</button>
      <button className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${__id}`)}>Leave</button>
    </div>

  );
};