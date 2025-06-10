import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import View from './Components/employee/View';

// Page components
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AddSalary from './Components/salary/AddSalary';
import Unauthorized from './pages/Unauthorised'; // ✅ Import
import ForgotPassword from './pages/ForgotPassword';

// Protected route utilities
import PrivateRoutes from './utils/PrivateRoute';
import RoleBaseRoutes from './utils/RoleBaseRoute';

// Auth context
import { useAuth } from './context/authContext';

// Dashboard & department components
import AdminSummary from './Components/dashboard/AdminSummary';
import DepartmentList from './Components/department/DepartmentList';
import AddDepartment from './Components/department/AddDepartment';
import EditDepartment from './Components/department/EditDepartment';

import List from './Components/employee/List';
import Add from './Components/employee/Add';
import Edit from './Components/employee/Edit';
import ViewSalary from './Components/salary/ViewSalary';
//import SummaryCard from './Components/dashboard/SummaryCard';
import Summary from './Components/EmployeeDashboard/Summary';
import LeaveList from './Components/leave/LeaveList';
import AddLeave from './Components/leave/Add';
import Setting from './Components/EmployeeDashboard/Setting';
import Table from './Components/leave/Table';
import Detail from './Components/leave/Detail';

function App() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Redirect root to admin dashboard */}
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} /> {/* ✅ Add this */}
      <Route path="/forgot-password" element={<ForgotPassword />} />


      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={['admin']}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      >
        <Route index element={<AdminSummary />} />
        <Route path="departments">
          <Route index element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path=":id" element={<EditDepartment />} />
        </Route>

        <Route path="employees" element={<List />} />
        <Route path="add-employee" element={<Add />} />
        <Route path="employees/:id" element={<View />} />
        <Route path="employees/edit/:id" element={<Edit />} />
        <Route path="employees/salary/:id" element={<ViewSalary />} />
        <Route path="salary/add" element={<AddSalary />} />
        <Route path="leaves" element={<Table />} />
        <Route path="leaves/:id" element={<Detail />} />
        <Route path="employees/leaves/:id" element={<LeaveList />} />
        <Route path="setting" element={<Setting />} />
      </Route>

      {/* Employee Dashboard */}
      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={['employee', 'admin']}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      >
        <Route index element={<Summary />} />
        <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
        <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
        <Route path="/employee-dashboard/leaves" element={<LeaveList />} />
        <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
        <Route path="/employee-dashboard/setting" element={<Setting />}></Route>


      </Route>

      {/* Catch-all fallback route */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
