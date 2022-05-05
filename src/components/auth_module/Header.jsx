import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

export const Header = ({ children }) => {
  return (
    <Typography sx={{ whiteSpace: 'nowrap' }} variant="h2">
      {children}
    </Typography>
  );
};

Header.propTypes = {
  children: PropTypes.string.isRequired
};
