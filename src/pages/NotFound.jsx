import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import logo from '../assets/logo/logo2.png';
import { ReactComponent as MissingSvg } from '../assets/no_data.svg';

const Logo = styled('img')({
  position: 'absolute',
  width: '10rem',
  left: '3rem',
  top: '2rem'
});

const MissingSvgStyled = styled(MissingSvg)({
  height: '70%'
});

export const NotFound = () => {
  const navigate = useNavigate();

  const handleReset = () => {
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
            Page not found...
          </Typography>
          <Typography>
            The page is missing or you misspelled the link. If you think that isn&apos;t the case,
            please contact us.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleReset}>
          Go to home page
        </Button>
      </Box>
      <MissingSvgStyled />
    </Box>
  );
};

export default NotFound;
