import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  console.log("Login component rendered");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ems-backend-i0kh.onrender.com/api/auth/login', {
        email,
        password
      });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);
        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 from 50% to-gray-100 to 50% space-y-6">
      <h2 className="text-3xl font-sevillana text-white">Employee Management System</h2>
      <div className="border shadow p-6 bg-white rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <Link to="/forgot-password" className="text-teal-600 hover:underline">Forgot Password</Link>

          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-teal-600 text-white py-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
