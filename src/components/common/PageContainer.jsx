import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export const PageContainer = ({ children, header }) => {
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
        {header}
      </Typography>
      {children}
    </Box>
  );
};

PageContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  header: PropTypes.string.isRequired
};
