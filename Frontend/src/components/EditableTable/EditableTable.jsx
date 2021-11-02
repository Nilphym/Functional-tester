/* eslint-disable no-console */
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';

import TableItem from './TableItem';
import { editTestStepTestData, editTestCaseTable } from '../../redux/store';

const MAX_ROWS_NUMBER = 11;
const MAX_COLUMNS_NUMBER = 11;

const processData = (data) => {
  const originalDataKeys = Object.keys(data);
  const tableNameIndex = originalDataKeys.indexOf('tableName');
  originalDataKeys.splice(tableNameIndex, 1);
  const dataKeys = originalDataKeys;
  const processedData = [];
  let array = [];
  dataKeys.forEach((key) => {
    if (key.toString().includes('RowName')) {
      array = [data[key]];
    }
    if (key.toString().includes('Data')) {
      array = [...array, ...data[key]];
      processedData.push([...array]);
      array.length = 0;
    }
  });
  return processedData;
};

const prepareOutputData = (values) => {
  let iterator = 1;
  const dataKeys = Object.keys(values).sort();
  console.log(dataKeys);
  const processedData = {};
  const array = [];
  dataKeys.forEach((key) => {
    if (key.toString().includes('-0-0')) {
      processedData[`RowName${iterator}`] = values[key];
    } else if (
      key
        .toString()
        .substring(key.length - 2)
        .includes('-0')
    ) {
      processedData[`Data${iterator}`] = [...array];
      iterator += 1;
      array.length = 0;
      processedData[`RowName${iterator}`] = values[key];
    } else if (key === dataKeys[dataKeys.length - 1]) {
      array.push(values[key]);
      processedData[`Data${iterator}`] = [...array];
    } else {
      array.push(values[key]);
    }
  });
  console.log(processedData);
  return processedData;
};

export const EditableTable = ({ parentComp, disabled, deleteTable, data, testStepId }) => {
  const { control: tableControl, getValues } = useForm();

  const defaultData = processData(data);
  const [rowsNumber, setRowsNumber] = useState(defaultData.length);
  const [columnsNumber, setColumnsNumber] = useState(defaultData[0].length);
  const [currentData, setCurrentData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const addRow = () => {
    setRowsNumber((number) => number + 1);
    const copyData = [...currentData];
    copyData.push([...Array.from(Array(copyData[copyData.length - 1].length).keys())].fill(''));
    setCurrentData(copyData);
  };

  const addColumn = () => {
    setColumnsNumber((number) => number + 1);
    let copyData = [...currentData];
    copyData = copyData.map((row) => [...row, '']);
    setCurrentData(copyData);
  };

  const deleteRow = () => {
    setRowsNumber((number) => number - 1);
    let copyData = [...currentData];
    copyData = copyData.slice(0, copyData.length - 1);
    setCurrentData(copyData);
  };

  const deleteColumn = () => {
    setColumnsNumber((number) => number - 1);
    let copyData = [...currentData];
    copyData = copyData.map((row) => row.slice(0, row.length - 1));
    setCurrentData(copyData);
  };

  const saveTable = () => {
    setIsEditing(false);
    const tableObject = prepareOutputData(getValues());
    tableObject.tableName = data.tableName;
    if (parentComp === 'testStep') {
      dispatch(editTestStepTestData({ id: testStepId, editedTable: tableObject }));
    } else {
      dispatch(editTestCaseTable({ editedTable: tableObject }));
    }
  };

  const functionalButtonStyle = {
    margin: '0 0.625rem 1.25rem 0'
  };

  return (
    <Box
      sx={{
        marginTop: '1.25rem'
      }}
    >
      <Box
        sx={{
          // border: '1px solid black',
          position: 'relative',
          marginTop: '0.625rem'
        }}
      >
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <Typography
            sx={{
              fontWeight: '700'
            }}
          >
            {data.tableName}
          </Typography>
          {!disabled && isEditing && rowsNumber < MAX_ROWS_NUMBER && (
            <Button
              variant="contained"
              sx={{ margin: '0 0.625rem 1.25rem 28rem' }}
              onClick={() => addRow()}
              startIcon={<AddIcon />}
            >
              Add row
            </Button>
          )}
          {!disabled && isEditing && columnsNumber < MAX_COLUMNS_NUMBER && (
            <Button
              variant="contained"
              sx={functionalButtonStyle}
              onClick={() => addColumn()}
              startIcon={<AddIcon />}
            >
              Add column
            </Button>
          )}
          {!disabled && isEditing && rowsNumber > 2 && (
            <Button
              variant="contained"
              sx={functionalButtonStyle}
              onClick={() => deleteRow()}
              startIcon={<RemoveIcon />}
            >
              Delete row
            </Button>
          )}
          {!disabled && isEditing && columnsNumber > 2 && (
            <Button
              variant="contained"
              sx={functionalButtonStyle}
              onClick={() => deleteColumn()}
              startIcon={<RemoveIcon />}
            >
              Delete column
            </Button>
          )}

          {!disabled && !isEditing && (
            <Button
              variant="contained"
              sx={{ margin: '0 0.625rem 1.25rem 55rem' }}
              onClick={() => setIsEditing(true)}
              startIcon={<CreateIcon />}
            >
              Edit Table
            </Button>
          )}
          {!disabled && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#dd2c00',
                margin: '0 0.625rem 1.25rem 0',
                '&:hover': {
                  backgroundColor: '#a30000'
                }
              }}
              onClick={() => deleteTable()}
              startIcon={<DeleteIcon />}
            >
              Delete table
            </Button>
          )}
        </Box>

        <Box
          sx={{
            width: '100%'
          }}
        >
          <Box
            sx={{
              width: '100%'
            }}
          >
            {currentData.map((row, rowIndex) => (
              <Box
                key={`${data.tableName}-row-${row[0]}`}
                sx={{
                  display: 'flex'
                }}
              >
                {row.map((item, columnIndex) => (
                  <TableItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${data.tableName}-${rowIndex}-${columnIndex}`}
                    name={data.tableName}
                    row={rowIndex}
                    column={columnIndex}
                    control={tableControl}
                    disabled={!isEditing}
                    defaultValue={item}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {isEditing && (
        <Button variant="contained" sx={{ marginTop: '1.5rem' }} onClick={() => saveTable()}>
          Save Table
        </Button>
      )}
    </Box>
  );
};

EditableTable.defaultProps = {
  testStepId: ''
};

EditableTable.propTypes = {
  parentComp: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  deleteTable: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  testStepId: PropTypes.string
};

export default EditableTable;
