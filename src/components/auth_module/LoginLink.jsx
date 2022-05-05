import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export const LoginLink = () => {
  return (
    <Box>
      <Typography>Already have an account?</Typography>
      <Link to="/login">Log in</Link>
    </Box>
  );
};
