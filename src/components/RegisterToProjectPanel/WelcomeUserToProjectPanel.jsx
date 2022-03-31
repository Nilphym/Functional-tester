import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledLink = styled(Link)({
  color: 'blue',
  textDecoration: 'none',
  position: 'absolute',
  right: '12rem',
  top: '60%',
  '&:visited, &:focus, &:hover, &:active': {
    color: 'blue'
  }
});

export const WelcomeUserToProjectPanel = () => {
  const { username } = useParams();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '23%',
        left: '50%',
        width: '60rem',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        sx={{
          marginBottom: '2.5rem'
        }}
        align="center"
        variant="h4"
        gutterBottom
        component="div"
      >
        Welcome to the Project!
      </Typography>
      <Typography align="center" variant="body1" gutterBottom component="div">
        {`Your login: ${username}`}
      </Typography>
      <Typography
        align="center"
        sx={{
          color: 'red'
        }}
      >
        Please, remember your data!
      </Typography>
      <Box
        sx={{
          position: 'relative',
          height: '6.25rem'
        }}
      >
        <StyledLink to="/login">
          <Button
            variant="contained"
            sx={{
              height: '3.125rem',
              marginTop: '0.625rem'
            }}
          >
            Close
          </Button>
        </StyledLink>
      </Box>
    </Box>
  );
};

export default WelcomeUserToProjectPanel;
