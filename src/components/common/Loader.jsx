import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';

export const Loader = ({ children, loading }) => {
  return loading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    children
  );
};

Loader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  loading: PropTypes.bool.isRequired
};
