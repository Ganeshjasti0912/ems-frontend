import React from 'react';
import { useAuth } from '../context/authContext.jsx';
import { Navigate } from 'react-router-dom';

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Debug logs (optional, for development)
  console.log("User:", user);
  console.log("Required Role(s):", requiredRole);

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user's role doesn't match, redirect to unauthorized
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If everything is fine, render the protected content
  return children;
};

export default RoleBaseRoute;
