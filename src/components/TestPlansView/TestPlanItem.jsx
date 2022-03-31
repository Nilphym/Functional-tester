import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import {
  setTestPlanId
} from '../../redux/store';

const TestPlanItem = ({ id, name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editTestPlanNavigate = () => {
    dispatch(setTestPlanId({ id }));
    localStorage.setItem('testPlanId', id);
    navigate(`/testPlan-e-${id}`);
  };

  const viewTestPlanNavigate = () => {
    dispatch(setTestPlanId({ id }));
    localStorage.setItem('testPlanId', id);
    navigate(`/testPlan-${id}`);
  };

  return (
    <Box
      sx={{
        height: '4rem',
        width: '100%',
        borderTop: '0.0625rem solid #b0bec5',
        borderBottom: '0.0625rem solid #b0bec5',
        position: 'relative'
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '3.5%',
          transform: 'translateY(-50%)',
          fontSize: '1rem'
        }}
      >
        {name}
      </Typography>
      <Button
        sx={{
          position: 'absolute',
          top: '50%',
          right: '12%',
          transform: 'translateY(-50%)'
        }}
        variant="contained"
        onClick={() => editTestPlanNavigate()}
      >
        Edit
      </Button>
      <Button
        sx={{
          position: 'absolute',
          top: '50%',
          right: '3%',
          transform: 'translateY(-50%)'
        }}
        variant="contained"
        onClick={() => viewTestPlanNavigate()}
      >
        View
      </Button>
    </Box>
  );
};

TestPlanItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default TestPlanItem;
