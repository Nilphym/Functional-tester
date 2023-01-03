import React from 'react';
import { Box, Typography } from '@mui/material';

import { DeleteUserList } from '../components';
import SimpleDialog from '../university/Dialog';

export const DeleteUserPage = () => {
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
        Users list
      </Typography>
      <DeleteUserList />
      <SimpleDialog
        lskey="delete"
        content="This page let's you to check users in your product and let you to delete them."
      />
    </Box>
  );
};
