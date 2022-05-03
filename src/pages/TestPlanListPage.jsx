import React from 'react';
import { Box, Typography } from '@mui/material';

import { TestPlanList } from '../components';

export const TestPlanListPage = () => {
  return (
    <Box
      sx={{
        padding: '2rem 0 0',
        minHeight: '100vh',
        display: 'grid',
        gap: '3rem',
        gridTemplateRows: 'min-content 1fr'
      }}
    >
      <Typography sx={{ margin: '0 2rem' }} color="primary.dark" component="h1" variant="h3">
        Test Plans
      </Typography>
      <TestPlanList />
    </Box>
  );
};
