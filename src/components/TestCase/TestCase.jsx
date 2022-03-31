import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector, useDispatch } from 'react-redux';

import EditableTable from '../EditableTable/EditableTable';
import {
  getTestCaseById,
  putTestCaseById,
  addTestCaseEntryDataItem,
  deleteTestCaseTextField,
  deleteTestCaseTable,
  editTestCasePreconditions,
  setTestCaseLoading
} from '../../redux/store';
import EditableTextField from '../EditableTextField/EditableTextField';

const formFields = {
  rowsNumber: 'rowsNumber',
  columnsNumber: 'columnsNumber'
};

const defaultValues = {
  [formFields.rowsNumber]: '',
  [formFields.columnsNumber]: ''
};

const schema = yup.object().shape({
  [formFields.rowsNumber]: yup.number().required().min(1).max(10),
  [formFields.columnsNumber]: yup.number().required().min(1).max(10)
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

export const TestCase = ({ isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTextField, setIsAddingTextField] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);

  const {
    control: testCaseControl,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const {
    selectedTestCase: { preconditions, entryData },
    isLoadingTestCase: isLoading
  } = useSelector((state) => state.test);

  const addTable = ({ rowsNumber, columnsNumber }) => {
    const filteredArray = entryData.filter((item) => item.entryType !== 'textField');
    const id =
      filteredArray.length > 0
        ? filteredArray[filteredArray.length - 1].name.toString().substring(6) * 1 + 1
        : 0;
    const newTable = createTable(id, rowsNumber, columnsNumber);
    dispatch(addTestCaseEntryDataItem({ newItem: newTable }));
    setIsAddingTable(false);
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  const addTextField = () => {
    const filteredArray = entryData.filter((item) => item.entryType === 'textField');
    const id =
      filteredArray.length > 0 ? filteredArray[filteredArray.length - 1].textFieldId * 1 + 1 : 0;
    const newTextField = {
      textFieldId: id,
      entryType: 'textField',
      textField: ''
    };
    dispatch(addTestCaseEntryDataItem({ newItem: newTextField }));
    setIsAddingTextField(false);
  };

  const deleteTextField = (id) => {
    dispatch(deleteTestCaseTextField({ textFieldId: id }));
  };

  const deleteTable = (tableName) => {
    dispatch(deleteTestCaseTable({ name : tableName }));
  };

  async function saveTestCase() {
    setIsEditing(false);
    setIsAddingTable(false);
    setIsAddingTextField(false);
    await dispatch(putTestCaseById());
    dispatch(setTestCaseLoading(true));
    await dispatch(getTestCaseById());
  }

  useEffect(() => {
    async function getTestCaseData() {
      await dispatch(getTestCaseById());
    }
    getTestCaseData();
  }, []);

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
                top: '6vh',
                right: '2vw'
              }}
              onClick={() => setIsEditing(true)}
              startIcon={<CreateIcon />}
            >
              Edit Case
            </Button>
          )}
          <Typography variant="h4" sx={{ fontSize: '1.9rem', fontWeight: '700' }}>
            Test Case
          </Typography>
          <Box>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline',
                marginTop: '0.625rem',
                marginBottom: '0.625rem'
              }}
            >
              Preconditions
            </Typography>
            <Controller
              name="preconditions"
              control={testCaseControl}
              render={({ field }) => (
                <TextField
                  id="preconditions"
                  type="text"
                  disabled={!isEditing}
                  multiline
                  rows={3}
                  {...field}
                  onChange={(e) => {
                    dispatch(editTestCasePreconditions({ editedPreconditions: e.target.value }));
                  }}
                  value={preconditions}
                  sx={{
                    marginTop: '0.625rem',
                    width: '100%'
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                textDecoration: 'underline',
                marginTop: '1.25rem',
                marginBottom: '0.625rem'
              }}
            >
              Entry Data
            </Typography>
            {entryData.length > 0 ? (
              <Box>
                {entryData.map((entryData, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Box key={`Bbb-${index}`}>
                    {entryData.entryType === 'textField' ? (
                      <Box
                        sx={{
                          position: 'relative'
                        }}
                      >
                        <EditableTextField
                          disabled={!isEditing}
                          data={entryData}
                          deleteTextField={() => deleteTextField(entryData.textFieldId)}
                        />
                      </Box>
                    ) : (
                      <EditableTable
                        parentComp="testCase"
                        key={`${entryData.name}`}
                        disabled={!isEditing}
                        data={entryData}
                        deleteTable={() => deleteTable(entryData.name)}
                      />
                    )}
                  </Box>
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
            <Box>
              {isEditing ? (
                <Box>
                  {!isAddingTable && !isAddingTextField ? (
                    <Box
                      sx={{
                        marginTop: '0.625rem'
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => setIsAddingTextField(true)}
                        startIcon={<AddIcon />}
                      >
                        Add TextField
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: '0.625rem' }}
                        onClick={() => setIsAddingTable(true)}
                        startIcon={<AddIcon />}
                      >
                        Add Table
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {isAddingTable ? (
                        <Box component="form" onSubmit={handleSubmit(addTable)}>
                          <Controller
                            shouldUnregister
                            name={formFields.rowsNumber}
                            control={testCaseControl}
                            render={({ field }) => (
                              <TextField
                                id={formFields.rowsNumber}
                                label="Rows Number"
                                type="text"
                                error={!!errors.rowsNumber}
                                helperText={
                                  !!errors.rowsNumber &&
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
                            name={formFields.columnsNumber}
                            control={testCaseControl}
                            render={({ field }) => (
                              <TextField
                                id={formFields.columnsNumber}
                                label="Columns Number"
                                type="text"
                                error={!!errors.columnsNumber}
                                helperText={
                                  !!errors.columnsNumber &&
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
                              setIsAddingTextField(false);
                              setIsAddingTable(false);
                              reset(defaultValues);
                            }}
                            startIcon={<CloseIcon />}
                          >
                            Close
                          </Button>
                        </Box>
                      ) : (
                        <Box>
                          <Button
                            onClick={() => addTextField()}
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
                              setIsAddingTextField(false);
                              setIsAddingTable(false);
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
              ) : (
                <Box />
              )}
            </Box>
          </Box>
          {isEditing && (
            <Button
              variant="contained"
              sx={{ marginTop: '1.5rem', bgcolor: '#0077c2', fontWeight: '700', color: 'white' }}
              onClick={() => saveTestCase()}
            >
              Save Test Case
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

TestCase.propTypes = {
  isEditable: PropTypes.bool.isRequired
};

export default TestCase;
