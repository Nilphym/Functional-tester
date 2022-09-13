import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export const PasswordResetLink = () => {
  return (
    <Box>
      <Typography>Have you forgot your password?</Typography>
      <Link to="/reset_password">Reset password</Link>
    </Box>
  );
};
