import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const ResetButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    onClick();
    navigate('/dashboard');
  };

  return (
    <Button variant="contained" startIcon={<ArrowBack />} onClick={handleReset}>
      Go to home page
    </Button>
  );
};

ResetButton.propTypes = {
  onClick: PropTypes.func
};

ResetButton.defaultProps = {
  onClick: null
};
