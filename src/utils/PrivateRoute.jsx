// utils/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 🟢 Prevent premature redirect
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
