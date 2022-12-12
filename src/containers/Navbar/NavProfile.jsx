/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Avatar, Alert, IconButton, Collapse } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const NavProfile = ({ avatar, name, role, projectName, compact }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: 'absolute', right: 0 }}>
      <Box
        sx={{
          margin: 'auto 0',
          padding: '2.1rem 2rem 1rem',
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
            top: '102%',
            right: '1rem',
            zIndex: 999
          }}
        >
          <Typography variant="h5">Your profile</Typography>
          <Typography variant="body2">Project: {projectName}</Typography>
          <Typography variant="body2">Name: {name}</Typography>
          <Typography sx={{ paddingBottom: '1rem' }} variant="body2">
            Role: {role}
          </Typography>
          <Link
            style={{ fontSize: '1.2rem', color: 'rgb(46,115,171)', textDecoration: 'none' }}
            to="/logout"
          >
            Logout
          </Link>
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
