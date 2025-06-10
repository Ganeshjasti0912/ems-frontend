import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-i0kh.onrender.com/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employees);
        } else {
          alert("API returned success: false");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(error?.response?.data?.error || "Unexpected error");
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img
                src={`https://ems-backend-i0kh.onrender.com/${employee?.userId?.profileImage}`}
                alt="Profile"
                className="rounded-full border w-48 h-48 object-cover"
              />
            </div>

            <div>
              <div className="mb-4">
                <p>
                  <span className="text-lg font-bold">Name:</span>{" "}
                  <span className="font-medium">{employee.userId.name}</span>
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <span className="text-lg font-bold">Employee ID:</span>{" "}
                  <span className="font-medium">{employee.employeeId}</span>
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <span className="text-lg font-bold">Date of Birth:</span>{" "}
                  <span className="font-medium">
                    {new Date(employee.dob).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <span className="text-lg font-bold">Gender:</span>{" "}
                  <span className="font-medium">{employee.gender}</span>
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <span className="text-lg font-bold">Department:</span>{" "}
                  <span className="font-medium">{employee.department.deptName}</span>
                </p>
              </div>

              <div className="mb-4">
                <p>
                  <span className="text-lg font-bold">Marital Status:</span>{" "}
                  <span className="font-medium">{employee.maritalStatus}</span>
                </p>
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

export default View;
