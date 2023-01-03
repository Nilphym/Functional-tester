import React from 'react';
import { Box, Typography } from '@mui/material';

import { TestRun } from '../containers';
import SimpleDialog from '../university/Dialog';

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
      <SimpleDialog
        lskey="testRun"
        content="Test run will let you to execute whole procedure step by step of a specific test case. From this view you will see all necessary informations about preconditions, entry data, expected results and steps. Every step have it's own name which is what you are supposed to do, control point which tells you what to expect by the end of the step, associated bugs with checkbox to mark if you've already reviewed them and test data if a specific step requires additional data. By controls on the left side you can navigate through the steps and report a new bug."
      />
    </Box>
  );
};

export default TestRunPage;
