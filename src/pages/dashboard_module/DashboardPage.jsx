import React from 'react';
import { Box, Typography } from '@mui/material';

import { Dashboard } from '../containers';

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
    </Box>
  );
};

export default DashboardPage;
