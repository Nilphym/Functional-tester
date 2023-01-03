import React from 'react';
import { Box, Typography } from '@mui/material';

import { TestPlanList } from '../components';
import SimpleDialog from '../university/Dialog';

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
      <SimpleDialog
        lskey="testPlanList"
        content="On test plans page you can see all the test plans you have created. You can also proceed to view the test suites of a specific test plan and search test plans by name."
      />
    </Box>
  );
};
