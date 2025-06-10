import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../Components/dashboard/AdminSidebar.jsx';
import Navbar from '../Components/dashboard/Navbar.jsx';
import AdminSummary from '../Components/dashboard/AdminSummary.jsx';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className='flex' >
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen' > 
        <Navbar/>
        <Outlet />{/* to display dynamic content based on the route */}
      </div>
    </div>
  );
};

export default AdminDashboard;
