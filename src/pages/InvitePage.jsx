import React from 'react';
import { Box, Typography } from '@mui/material';

import { InvitationForm } from '../components';
import SimpleDialog from '../university/Dialog';

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
      <SimpleDialog
        lskey="invite"
        content="From invite page you can add new users to your product and choose their role. An email will be send to their address with a link to create a new account."
      />
    </Box>
  );
};
