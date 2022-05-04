import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './containers';

const unsecuredPaths = ['/login', '/reset_password', '/register'];

const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!token && !unsecuredPaths.some((path) => pathname.includes(path))) {
    return <Navigate to="login" />;
  }

  if (!token && unsecuredPaths.some((path) => pathname.includes(path))) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        <Outlet />
        <ToastContainer position="bottom-right" />
      </Box>
    );
  }

  if (token && unsecuredPaths.some((path) => pathname.includes(path))) {
    return <Navigate to="dashboard" />;
  }

  const links = [{ icon: 'dashboard', text: 'Dashboard', destination: '/dashboard' }];

  switch (token.role) {
    case 'Tester':
      links.push(
        ...[
          { icon: 'tests', text: 'Test plans', destination: '/test_plans' },
          {
            icon: 'bugs',
            name: 'Bugs',
            links: [
              { text: 'All bugs', destination: '/bugs' },
              { text: 'Bugs to review', destination: '/bugs/retest' }
            ]
          },
          { icon: 'logout', text: 'Logout', destination: '/logout' }
        ]
      );
      break;
    case 'Developer':
      links.push(
        ...[
          {
            icon: 'bugs',
            name: 'Bugs',
            links: [
              { text: 'All bugs', destination: '/bugs' },
              { text: 'Active bugs', destination: '/bugs/active' },
              { text: 'My bugs', destination: '/bugs/assigned' }
            ]
          },
          { icon: 'logout', text: 'Logout', destination: '/logout' }
        ]
      );
      break;
    case 'ProjectManager':
      links.push(
        ...[
          { icon: 'tests', text: 'Test plans', destination: '/test_plans' },
          { icon: 'bugs', text: 'Bugs', destination: '/bugs' },
          { icon: 'addUser', text: 'Invite user', destination: '/invite_user' },
          { icon: 'deleteUser', text: 'Delete user', destination: '/delete_user' },
          { icon: 'logout', text: 'Logout', destination: '/logout' }
        ]
      );
      break;
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'min-content 1fr' }}>
      <Navbar links={links} />
      <Outlet />
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default Layout;
