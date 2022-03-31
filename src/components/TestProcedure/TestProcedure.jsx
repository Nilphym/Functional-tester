import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { useSelector, useDispatch } from 'react-redux';
import TestStep from '../TestStep/TestStep';
import {
  getTestProcedureById,
  postTestStep,
  editTestProcedureResult,
  setTestProcedureLoading,
  putTestProcedureById
} from '../../redux/store';

const formFields = {
  newTestStepName: 'newTestStepName'
};

const defaultValues = {
  [formFields.newTestStepName]: ''
};

const schema = yup.object().shape({
  [formFields.newTestStepName]: yup.string().required()
});

export const TestProcedure = ({ isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTestStep, setIsAddingTestStep] = useState(false);

  const {
    control: innerControl,
    handleSubmit: innerHandleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { control: testProcedureControl } = useForm();

  const dispatch = useDispatch();
  const {
    selectedTestProcedure: { result, testStepsIds },
    isLoadingTestProcedure: isLoading
  } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(setTestProcedureLoading({ isLoading: true }));
    async function getTestProcedureData() {
      await dispatch(getTestProcedureById());
    }
    getTestProcedureData();
  }, []);

  async function addTestStep({ newTestStepName }) {
    await dispatch(postTestStep(newTestStepName));
    reset(defaultValues, {
      keepIsValid: true
    });
    setIsAddingTestStep(false);
    setIsEditing(false);
    dispatch(setTestProcedureLoading({ isLoading: true }));
    await dispatch(getTestProcedureById());
  }

  async function saveTestProcedure() {
    setIsAddingTestStep(false);
    setIsEditing(false);
    await dispatch(putTestProcedureById());
    dispatch(setTestProcedureLoading({ isLoading: true }));
    await dispatch(getTestProcedureById());
  }

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
          <Box sx={{ position: 'relative', marginTop: '1.5rem', marginRight: '1.5rem' }}>
          {isEditable && !isEditing && (
            <Button
              variant="contained"
              sx={{
                position: 'absolute',
                top: '5vh',
                right: '2vw'
              }}
              onClick={() => setIsEditing(true)}
              startIcon={<CreateIcon />}
            >
              Edit Procedure
            </Button>
          )}
          <Typography variant="h4" sx={{ fontSize: '1.9rem', fontWeight: '700' }}>
            Test Procedure
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h5"
              sx={{ textDecoration: 'underline', marginTop: '0.625rem', marginBottom: '0.625rem' }}
            >
              Test Steps
            </Typography>
            {isEditable && isEditing && (
              <Box sx={{ marginTop: '0.2rem', marginLeft: '0.8rem' }}>
                {!isAddingTestStep ? (
                  <Button
                    onClick={() => setIsAddingTestStep(true)}
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Add Test Step
                  </Button>
                ) : (
                  <Box component="form" onSubmit={innerHandleSubmit(addTestStep)}>
                    <Controller
                      shouldUnregister
                      name={formFields.newTestStepName}
                      control={innerControl}
                      render={({ field }) => (
                        <TextField
                          id={formFields.newTestStepName}
                          label="New test step name"
                          type="text"
                          error={!!errors.newTestStepName}
                          helperText={
                            !!errors.newTestStepName && 'Test Step field cannot be empty!'
                          }
                          {...field}
                          sx={{
                            marginTop: '0.625rem'
                          }}
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        height: '3.125rem',
                        width: '7rem',
                        margin: '0.625rem 0.625rem 1.25rem 0.625rem'
                      }}
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        height: '3.125rem',
                        width: '7rem',
                        marginTop: '0.625rem',
                        marginBottom: '1.25rem'
                      }}
                      onClick={() => {
                        setIsAddingTestStep(false);
                        reset(defaultValues);
                      }}
                      startIcon={<CloseIcon />}
                    >
                      Close
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {testStepsIds && testStepsIds.length > 0 ? (
            testStepsIds.map((testStepId) => (
              <TestStep key={testStepId} testStepId={testStepId} isEditable={isEditing} />
            ))
          ) : (
            <Button
              sx={{
                '&.Mui-disabled': {
                  color: 'black'
                }
              }}
              variant="body1"
              startIcon={<WarningIcon />}
              disabled
            >
              No Data
            </Button>
          )}

          <Box>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline',
                marginTop: '1.25rem',
                marginBottom: '0.625rem'
              }}
            >
              Result
            </Typography>
            <Controller
              name="result"
              control={testProcedureControl}
              render={({ field }) => (
                <TextField
                  id="result"
                  type="text"
                  error=""
                  helperText=""
                  disabled={!isEditing}
                  multiline
                  rows={3}
                  {...field}
                  onChange={(e) => {
                    dispatch(editTestProcedureResult({ result: e.target.value }));
                  }}
                  value={result}
                  sx={{
                    marginTop: '0.625rem',
                    marginBottom: '1.5rem',
                    width: '100%'
                  }}
                />
              )}
            />
          </Box>
          {isEditing && (
            <Button
              variant="contained"
              sx={{ marginTop: '0.625rem', bgcolor: '#0077c2', fontWeight: '700', color: 'white' }}
              onClick={() => saveTestProcedure()}
            >
              Save Test Procedure
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestProcedure.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default TestProcedure;
