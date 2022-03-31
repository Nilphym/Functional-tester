import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import logo from '../assets/logo/logo2.png';
import { ReactComponent as BugSvg } from '../assets/bug_fixing.svg';

const Logo = styled('img')({
  position: 'absolute',
  width: '10rem',
  left: '3rem',
  top: '2rem'
});

const BugSvgStyled = styled(BugSvg)({
  height: '100%'
});

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    resetErrorBoundary();
    navigate('/dashboard');
  };

  return (
    <Box sx={{ height: '100vh', padding: '2.5rem', display: 'flex', alignItems: 'center' }}>
      <Logo alt="logo" src={logo} />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5rem' }}>
        <Box
          sx={{
            position: 'relative',
            maxWidth: '30rem',
            padding: '1rem',
            margin: '2rem 0',
            border: '2px solid #0002',
            borderLeft: '5px solid red',
            borderRadius: '0 5px 5px 0',
            backgroundColor: '#FFF'
          }}
        >
          <Typography sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            Something went wrong...
          </Typography>
          <Typography>
            Go to home page and try again. If the problem persists, please contact us.
          </Typography>
          <Typography variant="caption">{error.message}</Typography>
        </Box>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleReset}>
          Go to home page
        </Button>
      </Box>
      <BugSvgStyled />
    </Box>
  );
};

export default ErrorFallback;

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired
};
