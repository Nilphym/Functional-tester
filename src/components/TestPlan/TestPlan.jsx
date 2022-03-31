import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  getTestPlanById,
  putTestPlanById,
  editTestPlanName,
  postTestSuite,
  setLoading
} from '../../redux/store';
import TestSuiteItem from './TestSuiteItem';
import Error from '../Error/Error';

export const TestPlan = ({ isEditable }) => {
  const {
    selectedTestPlan: { name: testPlanName, testSuites },
    isLoading,
    error
  } = useSelector((state) => state.testPlan);

  const { control } = useForm();
  const { control: testSuiteControl, handleSubmit: handleTestSuite } = useForm();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTestSuite, setIsAddingTestSuite] = useState(false);

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    async function getTestPlanData() {
      await dispatch(getTestPlanById());
    }
    getTestPlanData();
  }, []);

  async function saveTestPlan() {
    setIsEditing(false);
    setIsAddingTestSuite(false);
    dispatch(setLoading({ isLoading: true }));
    await dispatch(putTestPlanById());
    await dispatch(getTestPlanById());
  }

  async function addTestSuite({ newTestSuite }) {
    setIsAddingTestSuite(false);
    await dispatch(postTestSuite(newTestSuite));
    dispatch(setLoading({ isLoading: true }));
    await dispatch(getTestPlanById());
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        margin: '1.5rem',
        minWidth: '62.5rem',
        width: 'calc(100%-10px)'
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          {isEditable && !isEditing && (
            <Button
              sx={{
                position: 'absolute',
                top: '3rem',
                right: '3rem'
              }}
              variant="contained"
              onClick={() => setIsEditing(true)}
              startIcon={<CreateIcon />}
            >
              Edit Test Plan
            </Button>
          )}
          <Box>
            <Typography
              variant="h2"
              sx={{
                userSelect: 'none',
                color: 'rgb(46, 115, 171)',
                fontFamily: 'Roboto',
                fontWeight: '400',
                marginTop: '0.625rem',
                fontSize: '3rem'
              }}
            >
              Test Plan:
            </Typography>
            <Controller
              shouldUnregister
              name="testPlanName"
              control={control}
              render={({ field }) => (
                <TextField
                  id="testPlanName"
                  label="Test Plan Name"
                  type="text"
                  {...field}
                  disabled={!isEditing}
                  value={testPlanName}
                  onChange={(e) => dispatch(editTestPlanName({ newTestName: e.target.value }))}
                  sx={{
                    marginTop: '1.25rem',
                    width: '15rem',
                    userSelect: 'none'
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '3rem' }}>
            {testSuites.map(({ id }) => (
              <TestSuiteItem isEditable={isEditing} editTest={isEditable} testSuiteId={id} />
            ))}
            {!isAddingTestSuite && isEditing && (
              <Button
                variant="contained"
                onClick={() => setIsAddingTestSuite(true)}
                sx={{ marginTop: '1rem', marginBottom: '0.625rem' }}
                startIcon={<AddIcon />}
              >
                Add a new Suite
              </Button>
            )}
          </Box>
          {isAddingTestSuite && (
            <Box
              sx={{
                position: 'relative',
                height: '5rem'
              }}
              component="form"
              onSubmit={handleTestSuite(addTestSuite)}
            >
              <Controller
                shouldUnregister
                name="newTestSuite"
                control={testSuiteControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="newTestSuite"
                    label="Test Suite"
                    type="text"
                    {...field}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '2%',
                      transform: 'translateY(-50%)',
                      width: '10rem'
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '19%',
                  '@media(min-width: 1350px)': {
                    left: '17.5%'
                  },
                  '@media(min-width: 1650px)': {
                    left: '14%'
                  }
                }}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
              <Button
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '30%',
                  '@media(min-width: 1350px)': {
                    left: '26%'
                  },
                  '@media(min-width: 1650px)': {
                    left: '21%'
                  }
                }}
                startIcon={<CloseIcon />}
                onClick={() => setIsAddingTestSuite(false)}
                variant="contained"
              >
                Close
              </Button>
            </Box>
          )}
          {isEditing && (
            <Button
              variant="contained"
              onClick={() => saveTestPlan()}
              sx={{
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                bgcolor: '#0077c2',
                fontWeight: '700',
                color: 'white'
              }}
            >
              Save Test Plan
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestPlan.propTypes = {
  isEditable: PropTypes.bool
};

TestPlan.defaultProps = {
  isEditable: false
};

export default TestPlan;
