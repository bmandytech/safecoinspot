import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');  // Check if auth token exists in localStorage

  // If no authToken is found, redirect the user to the login page
  if (!authToken) {
    return <Navigate to="/login" replace />;  // Using 'replace' to prevent adding the route to history
  }

  return children;  // If authenticated, render the children (protected page)
};

export default PrivateRoute;