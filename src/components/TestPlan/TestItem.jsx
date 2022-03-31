import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTestId, setExecutionTestId } from '../../redux/store';

const TestItem = ({ isEditable, testName, testId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const editTestNavigate = () => {
    dispatch(setTestId(testId));
    localStorage.setItem('testId', testId);
    navigate(`${pathname}/test-e-${testId}`);
  };

  const viewTestNavigate = () => {
    dispatch(setTestId(testId));
    localStorage.setItem('testId', testId);
    navigate(`${pathname}/test-${testId}`);
  };

  const executeTestNavigate = () => {
    dispatch(setExecutionTestId(testId));
    navigate('/test/execution');
  };

  return (
    <Box
      sx={{
        height: '4rem',
        width: '100%',
        backgroundColor: '#e1e1e1',
        borderTop: '0.0625rem solid #aeaeae',
        borderBottom: '0.0625rem solid #aeaeae',
        position: 'relative'
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '2.5%',
          transform: 'translateY(-50%)',
          userSelect: 'none'
        }}
      >
        {testName}
      </Typography>
      <Button
        onClick={() => viewTestNavigate()}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '1.5%',
          transform: 'translateY(-50%)'
        }}
        variant="contained"
      >
        View
      </Button>
      <Button
        onClick={() => executeTestNavigate()}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '8.5%',
          transform: 'translateY(-50%)'
        }}
        variant="contained"
      >
        Execute
      </Button>
      {isEditable && (
        <Button
          onClick={() => editTestNavigate()}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '18.5%',
            transform: 'translateY(-50%)'
          }}
          variant="contained"
          // disabled={counter > 0}
        >
          Edit
        </Button>
      )}
    </Box>
  );
};

TestItem.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  testName: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired
};

export default TestItem;
