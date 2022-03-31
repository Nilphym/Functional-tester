import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  color: 'blue',
  textDecoration: 'none',
  '&:visited, &:focus, &:hover, &:active': {
    color: 'blue'
  }
});

const TestCreationNav = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '7rem',
        width: '15rem',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black'
      }}
    >
      <StyledLink to="#!">
        <Button
          variant="contained"
          sx={{
            width: '15rem',
            height: '3rem',
            marginBottom: '0.625rem'
          }}
        >
          Create a new Test
        </Button>
      </StyledLink>
      <StyledLink to="#!">
        <Button
          variant="contained"
          sx={{
            width: '15rem',
            height: '3.5rem',
            marginBottom: '0.625rem'
          }}
        >
          Duplicate a test from another Plan Test
        </Button>
      </StyledLink>
    </Box>
  );
};

export default TestCreationNav;
