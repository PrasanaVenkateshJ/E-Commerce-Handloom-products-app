import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Check for both token and matching role
  if (!token || userRole !== role) {
    return <Navigate to={`/${role}/login`} />;
  }

  return children;
};

export default PrivateRoute;
