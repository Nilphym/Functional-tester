import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export const MessageBox = ({ title, content }) => {
  return (
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
      <Typography sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>{title}</Typography>
      <Typography>{content}</Typography>
    </Box>
  );
};

MessageBox.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
