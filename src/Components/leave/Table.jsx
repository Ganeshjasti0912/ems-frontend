import React, { use } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map(leave => ({
          __id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.deptName,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);

      } else {
        alert("API returned success: false");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert(error?.response?.data?.error || "Unexpected error");
    }
  }
  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredLeaves = leaves.filter(leave =>
      leave.employeeId.toLowerCase().includes(value)
    );
    setFilteredLeaves(filteredLeaves);
  };

  const filterByButton = (status) => {
    const filteredLeaves = leaves.filter(leave => leave.status === status);
    setFilteredLeaves(filteredLeaves);
  };

  return (
    <>
      {fetchLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mt-6">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}>
                Pending
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Approved")}>
                Approved
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}>
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-4">
            <DataTable
              columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : <div> Loading...</div>}
    </>
  )
}

export default Table;