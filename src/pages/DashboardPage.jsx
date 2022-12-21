import React from 'react';
import { Box, Typography } from '@mui/material';

import { Dashboard } from '../containers';
import SimpleDialog from '../university/Dialog';

export const DashboardPage = () => {
  return (
    <Box
      sx={{
        margin: '0 2rem',
        padding: '2rem 0',
        minHeight: '100vh',
        display: 'grid',
        gap: '3rem',
        gridTemplateRows: 'min-content 1fr'
      }}
    >
      <Typography color="primary.dark" component="h1" variant="h3">
        Dashboard
      </Typography>
      <Dashboard />
      <SimpleDialog
        lskey="dashboard"
        content="On this page you can see different stats of your project. Take a while to check every one of them and be sure where you can find specific informations. On the left side you can see the navigation menu which will take you to the different pages of the application. On the top right corner you can see the user menu which will take you to the user profile page and will let you to log out."
      />
    </Box>
  );
};

export default DashboardPage;
