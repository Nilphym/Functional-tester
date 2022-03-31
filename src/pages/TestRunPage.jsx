import React from 'react';
import { Box, Typography } from '@mui/material';

import { TestRun } from '../containers';

export const TestRunPage = () => {
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
        Test run
      </Typography>
      <TestRun />
    </Box>
  );
};

export default TestRunPage;
