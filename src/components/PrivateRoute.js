// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

// Helper component to protect private routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check if user is logged in (i.e., if token exists)

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  return children; // Render the protected page if the user is logged in
};

export default PrivateRoute;