import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Avatar } from '@mui/material';

export const NavProfile = ({ avatar, name, compact }) => {
  return (
    <Box
      sx={{
        margin: 'auto 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar
        sx={{
          width: '2.4rem',
          height: '2.4rem',
          backgroundColor: 'primary.dark',
          marginBottom: '0.5rem'
        }}
        src={avatar}
      >
        {name !== ' ' ? name.at(0) : ''}
      </Avatar>
      {!compact && <Typography sx={{ color: 'primary.dark' }}>{name}</Typography>}
    </Box>
  );
};

NavProfile.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  compact: PropTypes.bool
};

NavProfile.defaultProps = {
  avatar: '',
  compact: false
};
