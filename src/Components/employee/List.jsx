import React from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";

const List = () => {
  const [employees, setEmployees] = React.useState([]);
  const [empLoading, setEmpLoading] = React.useState(false);
  const [filterEmployees, setFilterEmployees] = React.useState([]);

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/employee', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map(emp => ({
          __id: emp._id,
          sno: sno++,
          deptName: emp.department.deptName,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: <img width={40} className="rounded-full" src={`http://localhost:3000/${emp.userId.profileImage}`} />,
          action: (<EmployeeButtons __id={emp._id} />)
        }));
        setEmployees(data);
        setFilterEmployees(data); // Initialize filter with all employees

      } else {
        alert("API returned success: false");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert(error?.response?.data?.error || "Unexpected error");
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => {
      return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterEmployees(records);
  }

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Dept Name"
          className="px-4 py-0.5 border rounded"
          onChange={handleFilter}

        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Add New Employee
        </Link>
      </div>
      {/* Future implementation for displaying employee data will go here */}
      <div>
        <DataTable columns={columns} data={filterEmployees}
          pagination />
      </div>
    </div>
  );
}
export default List