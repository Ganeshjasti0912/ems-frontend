import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://ems-backend-i0kh.onrender.com/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setLeave(response.data.leave);
        } else {
          alert("API returned success: false");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(error?.response?.data?.error || "Unexpected error");
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://ems-backend-i0kh.onrender.com/api/leave/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate('/admin-dashboard/leaves');
      } else {
        alert("API returned success: false");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert(error?.response?.data?.error || "Unexpected error");
    }
  }

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img
                src={`https://ems-backend-i0kh.onrender.com/${leave?.employeeId.userId?.profileImage || 'default.jpg'}`}
                alt="Profile"
                className="rounded-full border w-40 h-40 object-cover bg-gray-200"
              />
            </div>

            <div>
              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">Name:</span>{" "}
                  <span className="font-medium">{leave.employeeId.userId.name}</span>
                </p>
              </div>

              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">Employee ID:</span>{" "}
                  <span className="font-medium">{leave.employeeId.employeeId}</span>
                </p>
              </div>

              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">LeaveType:</span>{" "}
                  <span className="font-medium">
                    {leave.leaveType}
                  </span>
                </p>
              </div>

              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">Reason:</span>{" "}
                  <span className="font-medium">{leave.reason}</span>
                </p>
              </div>

              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">Department:</span>{" "}
                  <span className="font-medium">{leave.employeeId.department.deptName}</span>
                </p>
              </div>

              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">Start Date:</span>{" "}
                  <span className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</span>
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <span className="text-lg font-bold">End Date:</span>{" "}
                  <span className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</span>
                </p>
              </div>
              <div className="mb-2 flex items-center space-x-4">
                <span className="text-lg font-bold">Action:</span>
                {leave.status === "Pending" ? (
                  <>
                    <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700" onClick={
                      () => changeStatus(leave._id, "Approved")
                    }>
                      Approve
                    </button>
                    <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700" onClick={
                      () => changeStatus(leave._id, "Rejected")
                    }>
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="font-medium">{leave.status}</span>
                )}
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Detail;
