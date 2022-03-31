import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ role, customValidation }) => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  if (customValidation && !customValidation()) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  if ((role && token.role !== role) || !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;

RequireAuth.propTypes = {
  role: PropTypes.string,
  customValidation: PropTypes.func
};

RequireAuth.defaultProps = {
  role: null,
  customValidation: null
};
