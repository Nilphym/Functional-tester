import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export const SubmitButton = ({ children }) => {
  return (
    <Button type="submit" variant="contained" sx={{ height: '3rem' }}>
      {children}
    </Button>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired
};
