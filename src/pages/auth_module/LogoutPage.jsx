import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { logout } from '../../redux/store';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Navigate to="/login" />;
};
