import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import logo from '../../assets/logo/logo2.png';

export const Container = ({ children, BackgroundIcon }) => {
  return (
    <Box sx={{ height: '100vh', padding: '2.5rem', display: 'flex', alignItems: 'center' }}>
      <img
        sx={{
          position: 'absolute',
          width: '10rem',
          left: '3rem',
          top: '2rem'
        }}
        alt="logo"
        src={logo}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5rem' }}>{children}</Box>
      <BackgroundIcon />
    </Box>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  BackgroundIcon: PropTypes.node.isRequired
};
