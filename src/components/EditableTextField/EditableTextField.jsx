import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import { editTestCaseTextField } from '../../redux/store';

export const EditableTextField = ({ disabled, deleteTextField, data }) => {
  const { control: textFieldControl, getValues } = useForm();

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const saveTextField = () => {
    setIsEditing(false);
    const textFieldObject = {
      textFieldId: data.textFieldId,
      entryType: 'textField',
      textField: getValues(`textField-${data.textFieldId}`)
    };
    dispatch(editTestCaseTextField({ editedTextField: textFieldObject }));
  };

  return (
    <Box
      sx={{
        marginTop: '1.25rem'
      }}
    >
      <Box
        sx={{
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
            {`TextField ${data.textFieldId}`}
          </Typography>
          {!disabled && !isEditing && (
            <Button
              variant="contained"
              sx={{ margin: '0 0.625rem 1.25rem 49rem' }}
              onClick={() => setIsEditing(true)}
              startIcon={<CreateIcon />}
            >
              Edit TextField
            </Button>
          )}
          {!disabled && (
            <Button
              variant="contained"
              sx={
                !isEditing
                  ? {
                      margin: '0 0.625rem 1.25rem 0',
                      backgroundColor: '#dd2c00',
                      '&:hover': {
                        backgroundColor: '#a30000'
                      }
                    }
                  : {
                      margin: '0 0.625rem 1.25rem 60rem',
                      backgroundColor: '#dd2c00',
                      '&:hover': {
                        backgroundColor: '#a30000'
                      }
                    }
              }
              onClick={() => deleteTextField()}
              startIcon={<DeleteIcon />}
            >
              Delete TextField
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
            <Controller
              shouldUnregister
              name={`textField-${data.textFieldId}`}
              control={textFieldControl}
              defaultValue={data.textField}
              render={({ field }) => (
                <TextField
                  id={`textField-${data.textFieldId}`}
                  type="text"
                  multiline
                  rows={3}
                  disabled={!isEditing}
                  {...field}
                  sx={{
                    width: '100%'
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      {isEditing && (
        <Button variant="contained" sx={{ marginTop: '1.5rem' }} onClick={() => saveTextField()}>
          Save TextField
        </Button>
      )}
    </Box>
  );
};

EditableTextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  deleteTextField: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default EditableTextField;
