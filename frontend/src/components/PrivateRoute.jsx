import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default PrivateRoute;
