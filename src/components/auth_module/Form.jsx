import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export const Form = ({ children, onSubmit, sx }) => {
  return (
    <Box
      sx={{
        ...{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem'
        },
        ...sx
      }}
      component="form"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  sx: PropTypes.object
};

Form.defaultProps = {
  sx: {}
};
