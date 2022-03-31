import * as yup from 'yup';

import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import PropTypes from 'prop-types';
import WarningIcon from '@mui/icons-material/Warning';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTestStepById,
  putTestStepById,
  addTestStepTestData,
  deleteTestStepTestData,
  editTestStepControlPoint,
  setTestStepName
} from '../../redux/store';
import EditableTable from '../EditableTable/EditableTable';

const formFieldsTable = {
  rowsNumber: 'rowsNumber',
  columnsNumber: 'columnsNumber'
};

const defaultValuesTable = {
  [formFieldsTable.rowsNumber]: '',
  [formFieldsTable.columnsNumber]: ''
};

const schemaTable = yup.object().shape({
  [formFieldsTable.rowsNumber]: yup.number().required().min(1).max(10),
  [formFieldsTable.columnsNumber]: yup.number().required().min(1).max(10)
});

const formFieldsStepName = {
  stepName: 'stepName'
};

const schemaStepName = yup.object().shape({
  [formFieldsStepName.stepName]: yup.string().required()
});

const createTable = (tablesCount, rowsCount, columnsCount) => {
  const tableObject = {};
  const table = [];
  const array = [...Array.from(Array(columnsCount + 1).keys())].fill('');
  for (let i = 1; i <= rowsCount + 1; i += 1) {
    table.push(array);
  }
  tableObject.name = `Table ${tablesCount}`;
  tableObject.table = table;
  return tableObject;
};

export const TestStep = ({ testStepId, isEditable }) => {
  const dispatch = useDispatch();

  const [isOpened, setIsOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [isEditingStepName, setIsEditingStepName] = useState(false);
  const { selectedTestStep, isLoadingTestStep: isLoading } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getTestStepById(testStepId));
  }, [testStepId]);

  const {
    control: innerControlTable,
    handleSubmit: handleSubmitTable,
    reset: resetTable,
    formState: { errors: errorsTable }
  } = useForm({
    defaultValuesTable,
    resolver: yupResolver(schemaTable)
  });

  const {
    control: innerControlStepName,
    handleSubmit: handleSubmitStepName,
    reset: resetStepName,
    formState: { errors: errorsStepName }
  } = useForm({
    resolver: yupResolver(schemaStepName)
  });

  const { control: innerControlControlPoint, getValues } = useForm();

  const addTable = ({ rowsNumber, columnsNumber }) => {
    const id =
      selectedTestStep[testStepId].testData && selectedTestStep[testStepId].testData.length > 0
        ? selectedTestStep[testStepId].testData[
            selectedTestStep[testStepId].testData.length - 1
          ].name
            .toString()
            .substring(6) *
            1 +
          1
        : 0;
    const newTable = createTable(id, rowsNumber, columnsNumber);
    dispatch(addTestStepTestData({ id: testStepId, newTable }));
    setIsAddingTable(false);
    resetTable(defaultValuesTable, {
      keepIsValid: true
    });
  };

  const changeStepName = ({ stepName }) => {
    dispatch(setTestStepName({ id: testStepId, newName: stepName }));
    setIsEditingStepName(false);
  };

  const deleteTable = (tableName) => {
    dispatch(deleteTestStepTestData({ id: testStepId, name: tableName }));
  };

  async function saveTestStep() {
    setIsEditing(false);
    setIsAddingTable(false);
    dispatch(
      editTestStepControlPoint({ id: testStepId, editedControlPoint: getValues('controlPoint') })
    );
    await dispatch(putTestStepById(testStepId));
    await dispatch(getTestStepById(testStepId));
  }

  return (
    <Box>
      {isLoading[testStepId] ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            width: '100%',
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <KeyboardArrowDownIcon
              sx={
                isOpened
                  ? {
                      position: 'absolute',
                      top: '30%',
                      left: '2.5%',
                      zIndex: '1',
                      transform: 'rotate(180deg)'
                    }
                  : { position: 'absolute', top: '30%', left: '2.5%', zIndex: '1' }
              }
            />
            <Button
              onClick={!isEditing ? () => setIsOpened((state) => !state) : () => {}}
              variant="contained"
              sx={{
                height: '3.5rem',
                width: '100%',
                bgcolor: 'white',
                textTransform: 'capitalize',
                borderTop: '0.0625rem solid #bdbdbd',
                borderBottom: '0.0625rem solid #bdbdbd',
                fontWeight: '700',
                '&:hover': {
                  bgcolor: 'white'
                }
              }}
            >
              {selectedTestStep[testStepId]
                ? `${selectedTestStep[testStepId].stepNumber}. ${selectedTestStep[testStepId].name}`
                : 'Loading ...'}
            </Button>
          </Box>

          {isOpened && (
            <Box>
              {isEditable && !isEditing && (
                <Button
                  variant="contained"
                  sx={{
                    position: 'absolute',
                    top: '7vh',
                    right: '2vw'
                  }}
                  onClick={() => setIsEditing(true)}
                  startIcon={<CreateIcon />}
                >
                  Edit Step
                </Button>
              )}
              <Box>
                {isEditing &&
                  (!isEditingStepName ? (
                    <Button
                      sx={{
                        marginTop: '0.625rem'
                      }}
                      onClick={() => setIsEditingStepName(true)}
                      variant="contained"
                    >
                      Edit Step Name
                    </Button>
                  ) : (
                    <Box component="form" onSubmit={handleSubmitStepName(changeStepName)}>
                      <Controller
                        shouldUnregister
                        name={formFieldsStepName.stepName}
                        control={innerControlStepName}
                        render={({ field }) => (
                          <TextField
                            id={formFieldsStepName.stepName}
                            label="Step Name"
                            type="text"
                            defaultValue={selectedTestStep[testStepId].name}
                            error={!!errorsStepName.stepName}
                            helperText={!!errorsStepName.stepName && 'Step Name field is required!'}
                            {...field}
                            sx={{
                              marginTop: '0.625rem',
                              width: '10rem'
                            }}
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          height: '3.125rem',
                          minWidth: '13rem',
                          margin: '0.625rem 0.625rem 1.25rem 0.625rem'
                        }}
                        startIcon={<CreateIcon />}
                      >
                        Change Step Name
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
                          setIsEditingStepName(false);
                          resetStepName({ stepName: selectedTestStep[testStepId].name });
                        }}
                        startIcon={<CloseIcon />}
                      >
                        Close
                      </Button>
                    </Box>
                  ))}
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: '0.625rem',
                    fontStyle: 'italic'
                  }}
                >
                  Test Data
                </Typography>
                {selectedTestStep[testStepId].testData &&
                selectedTestStep[testStepId].testData.length > 0 ? (
                  <Box>
                    {selectedTestStep[testStepId].testData.map((data) => (
                      <EditableTable
                        parentComp="testStep"
                        key={`${data.name}`}
                        disabled={!isEditing}
                        data={data}
                        deleteTable={() => deleteTable(data.name)}
                        testStepId={testStepId}
                      />
                    ))}
                  </Box>
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
                {isEditing &&
                  (!isAddingTable ? (
                    <Button
                      variant="contained"
                      sx={{ marginTop: '0.625rem' }}
                      onClick={() => setIsAddingTable(true)}
                      startIcon={<AddIcon />}
                    >
                      Add table
                    </Button>
                  ) : (
                    <Box component="form" onSubmit={handleSubmitTable(addTable)}>
                      <Controller
                        shouldUnregister
                        name={formFieldsTable.rowsNumber}
                        control={innerControlTable}
                        render={({ field }) => (
                          <TextField
                            id={formFieldsTable.rowsNumber}
                            label="Rows Number"
                            type="text"
                            error={!!errorsTable.rowsNumber}
                            helperText={
                              !!errorsTable.rowsNumber &&
                              'Rows number is required and must belong to [1-10]!'
                            }
                            {...field}
                            sx={{
                              marginTop: '0.625rem',
                              width: '10rem'
                            }}
                          />
                        )}
                      />
                      <Controller
                        shouldUnregister
                        name={formFieldsTable.columnsNumber}
                        control={innerControlTable}
                        render={({ field }) => (
                          <TextField
                            id={formFieldsTable.columnsNumber}
                            label="Columns Number"
                            type="text"
                            error={!!errorsTable.columnsNumber}
                            helperText={
                              !!errorsTable.columnsNumber &&
                              'Columns number is required and must belong to [1-10]!'
                            }
                            {...field}
                            sx={{
                              marginTop: '0.625rem',
                              width: '10rem'
                            }}
                          />
                        )}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
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
                        variant="outlined"
                        sx={{
                          height: '3.125rem',
                          width: '7rem',
                          marginTop: '0.625rem',
                          marginBottom: '1.25rem'
                        }}
                        onClick={() => {
                          setIsAddingTable(false);
                          resetTable(defaultValuesTable);
                        }}
                        startIcon={<CloseIcon />}
                      >
                        Close
                      </Button>
                    </Box>
                  ))}
              </Box>
              <Box>
                <Typography sx={{ marginTop: '1.25rem', fontStyle: 'italic' }} variant="h5">
                  Control Point
                </Typography>
                <Controller
                  name="controlPoint"
                  control={innerControlControlPoint}
                  defaultValue={selectedTestStep[testStepId].controlPoint}
                  render={({ field }) => (
                    <TextField
                      id="controlPoint"
                      label={!selectedTestStep[testStepId].controlPoint && 'Control Point'}
                      type="text"
                      disabled={!isEditing}
                      multiline
                      rows={3}
                      {...field}
                      sx={{
                        marginTop: '0.625rem',
                        width: '100%'
                      }}
                    />
                  )}
                />
              </Box>
              {isEditing && (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '0.625rem',
                    bgcolor: '#0077c2',
                    fontWeight: '700',
                    color: 'white'
                  }}
                  onClick={() => saveTestStep()}
                >
                  Save Test Step
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

TestStep.propTypes = {
  testStepId: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired
};

export default TestStep;
