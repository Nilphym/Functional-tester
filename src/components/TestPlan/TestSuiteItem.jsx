import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import TestItem from './TestItem';
import { putTestSuite, postTest, getTestSuiteTests } from '../../redux/store';

const TestSuiteItem = ({ isEditable, editTest, testSuiteId }) => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const [isChangingTestSuiteName, setIsChangingTestSuiteName] = useState(false);
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [helper, setHelper] = useState(false);

  const {
    selectedTestPlanId,
    selectedTestPlan: { tests, categories },
    isLoadingTestSuites
  } = useSelector((state) => state.testPlan);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    control: controlTest,
    handleSubmit: handleSubmitTest,
    formState: { errors: errorsTest }
  } = useForm();

  useEffect(() => {
    dispatch(getTestSuiteTests(testSuiteId));
  }, [testSuiteId, helper]);

  async function changeSuiteName({ testSuiteName }) {
    await dispatch(putTestSuite({ newTestSuiteName: testSuiteName, testSuiteId }));
    setIsChangingTestSuiteName(false);
    setHelper((state) => !state);
    setIsOpened(false);
  }

  async function addTest({ testName }) {
    await dispatch(
      postTest({
        testPlanId: selectedTestPlanId,
        testSuiteId,
        testName
      })
    );
    setIsAddingTest(false);
    setHelper((state) => !state);
  }

  return (
    <Box>
      {isLoadingTestSuites[testSuiteId] ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box>
            <Box
              onClick={!isChangingTestSuiteName ? () => setIsOpened((state) => !state) : () => {}}
              sx={
                !isChangingTestSuiteName && (isEditable || tests[testSuiteId].length) > 0
                  ? {
                      position: 'relative',
                      height: '5rem',
                      width: '100%',
                      backgroundColor: '#00000',
                      borderTop: '0.0625rem solid #b0bec5',
                      borderBottom: '0.0625rem solid #b0bec5',
                      padding: '0.625rem',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }
                  : {
                      position: 'relative',
                      height: '5rem',
                      width: '100%',
                      backgroundColor: '#00000',
                      borderTop: '0.0625rem solid #b0bec5',
                      borderBottom: '0.0625rem solid #b0bec5',
                      padding: '0.625rem'
                    }
              }
            >
              {!isChangingTestSuiteName && (
                <KeyboardArrowDownIcon
                  sx={
                    isOpened
                      ? {
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%) rotate(180deg)',
                          left: '2.5%',
                          zIndex: '1'
                        }
                      : {
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          left: '2.5%',
                          zIndex: '1'
                        }
                  }
                />
              )}

              {!isChangingTestSuiteName && (
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '7%',
                    transform: 'translateY(-50%)',
                    userSelect: 'none',
                    fontWeight: '700'
                  }}
                >
                  {categories[testSuiteId]}
                </Typography>
              )}

              {isEditable &&
                (!isChangingTestSuiteName ? (
                  <Button
                    onClick={() => {
                      setIsOpened(false);
                      setIsChangingTestSuiteName(true);
                    }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: '2.5%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    variant="contained"
                    startIcon={<CreateIcon />}
                  >
                    Edit Suite
                  </Button>
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      height: '5rem',
                      width: '100%',
                      top: '0%',
                      left: '0%'
                    }}
                    component="form"
                    onSubmit={handleSubmit(changeSuiteName)}
                  >
                    <Controller
                      shouldUnregister
                      name="testSuiteName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          id="testSuiteName"
                          label="Test Suite Name"
                          type="text"
                          {...field}
                          disabled={!isEditable}
                          error={!!errors.testSuiteName}
                          helperText={!!errors.testSuiteName && 'Field cannot be empty!'}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '1.5%',
                            transform: 'translateY(-50%)',
                            width: '15rem'
                          }}
                        />
                      )}
                    />
                    <Button
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: '18%'
                      }}
                      variant="contained"
                      type="submit"
                      startIcon={<CreateIcon />}
                    >
                      Change
                    </Button>
                    <Button
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: '27%'
                      }}
                      onClick={() => {
                        setIsChangingTestSuiteName(false);
                        setIsOpened(false);
                      }}
                      variant="contained"
                      startIcon={<CloseIcon />}
                    >
                      Close
                    </Button>
                  </Box>
                ))}
            </Box>
            <Box>
              {!isChangingTestSuiteName &&
                isOpened &&
                tests[testSuiteId].map(({ id, name }) => (
                  <TestItem isEditable={editTest} testName={name} testId={id} />
                ))}
            </Box>
          </Box>
          {!isChangingTestSuiteName && isOpened && isEditable && (
            <Box>
              {!isAddingTest ? (
                <Button
                  sx={{
                    margin: '0.625rem 0 0.625rem 1rem'
                  }}
                  onClick={() => setIsAddingTest(true)}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Add a new test
                </Button>
              ) : (
                <Box
                  sx={{ position: 'relative', height: '5rem' }}
                  component="form"
                  onSubmit={handleSubmitTest(addTest)}
                >
                  <Controller
                    shouldUnregister
                    name="testName"
                    control={controlTest}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        id="testName"
                        label="Test Name"
                        type="text"
                        {...field}
                        error={!!errorsTest.testName}
                        helperText={!!errorsTest.testName && 'Field cannot be empty!'}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '1.5%',
                          transform: 'translateY(-50%)',
                          width: '15rem'
                        }}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '18%',
                      transform: 'translateY(-50%)'
                    }}
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                  <Button
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '25%',
                      transform: 'translateY(-50%)'
                    }}
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => setIsAddingTest(false)}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

TestSuiteItem.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  editTest: PropTypes.bool.isRequired,
  testSuiteId: PropTypes.string.isRequired
};

export default TestSuiteItem;
