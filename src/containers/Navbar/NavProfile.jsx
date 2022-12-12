/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Avatar, Alert, IconButton, Collapse } from '@mui/material';
import { Close } from '@mui/icons-material';

export const NavProfile = ({ avatar, name, role, projectName, compact }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: '100%', position: 'relative', bottom: compact ? 0 : '1rem' }}>
      <Box
        sx={{
          margin: 'auto 0',
          padding: '1rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(206, 242, 255, 0.5)'
          }
        }}
        onClick={() => {
          setOpen((prev) => !prev);
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
        {!compact &&
          (role === 'ProjectManager' ? (
            <Typography sx={{ color: 'primary.dark' }}>Project Manager</Typography>
          ) : (
            <Typography sx={{ color: 'primary.dark' }}>{role}</Typography>
          ))}
      </Box>

      <Collapse in={open}>
        <Alert
          icon={false}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{
            mb: 2,
            width: 'max-content',
            backgroundColor: 'rgb(227,242,253)',
            position: 'absolute',
            top: 0,
            left: '105%',
            zIndex: 999
          }}
        >
          <Typography variant="h5">Your profile</Typography>
          <Typography variant="body2">Project: {projectName}</Typography>
          <Typography variant="body2">Name: {name}</Typography>
          <Typography variant="body2">Role: {role}</Typography>
        </Alert>
      </Collapse>
    </Box>
  );
};

NavProfile.propTypes = {
  avatar: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  compact: PropTypes.bool
};

NavProfile.defaultProps = {
  avatar: '',
  compact: false
};
