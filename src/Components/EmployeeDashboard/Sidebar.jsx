import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'; // Importing an icon for the sidebar
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64' >
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="text-2xl font-pacific text-center">Employee MS</h3>
            </div>
            <div>
                <NavLink to="/employee-dashboard" className={({ isActive }) =>
                    `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user.userId}`} className={({ isActive }) =>
                    `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaUsers />
                    <span>My Profile</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/leaves/${user.userId}`}
                    className={({ isActive }) =>
                        `${isActive ? 'bg-teal-500 ' : ''}flex items-center space-x-4 block py-2.5 px-4 rounded`
                    }
                >
                    <FaBuilding />
                    <span>Leaves</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/salary/${user.userId}`} className={({ isActive }) =>
                    `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>

                <NavLink to="/employee-dashboard/setting" className={({ isActive }) =>
                    `${isActive ? "bg-teal-500 " : ""}flex items-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaCogs />
                    <span>Settings</span>
                </NavLink>

            </div>
        </div>
    );
}
export default Sidebar;