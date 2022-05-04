import React from 'react';
import { Box, Typography } from '@mui/material';

import { InvitationForm } from '../components';

export const InvitePage = () => {
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
        Invite user
      </Typography>
      <InvitationForm />
    </Box>
  );
};
