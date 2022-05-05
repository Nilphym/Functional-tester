import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

import { TestPlan } from '../components';

export const TestPlanPage = () => {
  const { name } = useParams();

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
        <span>Test Plan - </span>
        <span>{name}</span>
      </Typography>
      <TestPlan />
    </Box>
  );
};
