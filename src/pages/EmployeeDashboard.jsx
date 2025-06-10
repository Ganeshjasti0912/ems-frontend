import React from 'react';
import Sidebar from '../Components/EmployeeDashboard/Sidebar';
import Navbar from '../Components/dashboard/Navbar';
import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes

const EmployeeDashboard = () => {
    return (
        <div className='flex' >
      <Sidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen' > 
        <Navbar/>
        <Outlet />{/* to display dynamic content based on the route */}
      </div>
    </div>
    );
}       

export default EmployeeDashboard;