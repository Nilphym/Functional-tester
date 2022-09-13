import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/lab';
import { Done, Error } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { useDropzone } from 'react-dropzone';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

import { executeTest, createBug, uploadImage } from '../../redux/store';

export const ButtonStepCell = ({ index, stepId, testId, useTableStepsRef }) => {
  const dispatch = useDispatch();
  const { types, impacts, priorities } = useSelector((state) => state.bugs.options);
  const { handleSubmit, setValue, control } = useForm();
  const { currentState, stepStates, doneAction, bugAction, clearAction } = useTableStepsRef;
  const [openExecutionDialog, setOpenExecutionDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const lastStepNumber = Object.keys(currentState).length - 1;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const handleNextStep = () => {
    if (index !== lastStepNumber) {
      doneAction(index);
    } else {
      setOpenExecutionDialog(true);
    }
  };

  const onSubmitNewError = ({ name, description, impact, priority, type, deadline }) => {
    const newBugData = {
      stepId,
      name,
      description,
      deadline: DateTime.fromFormat(deadline, 'MM/dd/yyyy').toISO().substring(0, 19),
      impact,
      priority,
      type,
      reportDate: DateTime.now().toISO().substring(0, 19)
    };

    dispatch(createBug({ data: newBugData }))
      .unwrap()
      .then((newBug) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = async () => {
            const regex = new RegExp(/(data:\w+\/\w+;base64,)(.+)/gm);
            dispatch(
              uploadImage({
                bugId: newBug.id,
                imageBase64: regex.exec(reader.result)[2],
                imageName: file.name.split('.')[0]
              })
            );
          };
          reader.readAsDataURL(file);
        });
      });
    bugAction(index);
  };

  const handleTestExecution = () => {
    dispatch(executeTest({ id: testId }));
    doneAction(index);
  };

  switch (currentState[index]) {
    case stepStates.choose:
      return (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton component="span" color="primary" size="small" onClick={handleNextStep}>
              <Done />
            </IconButton>
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => setOpenErrorDialog(true)}
            >
              <Error />
            </IconButton>
          </Box>
          <Dialog
            fullWidth
            open={openExecutionDialog}
            onClose={() => setOpenExecutionDialog(false)}
          >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>You will mark this test as executed successfully</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenExecutionDialog(false)}>Close</Button>
              <Button onClick={handleTestExecution}>Confirm</Button>
            </DialogActions>
          </Dialog>
          <Dialog fullWidth open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
            <form onSubmit={handleSubmit(onSubmitNewError)}>
              <DialogTitle>Report new error</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="name"
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      id="description"
                      label="Description"
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="deadline"
                  defaultValue={DateTime.now().toFormat('MM/dd/yyyy')}
                  render={({ field }) => (
                    <DatePicker
                      label="Deadline"
                      inputFormat="MM/dd/yyyy"
                      renderInput={(params) => <TextField size="small" {...params} />}
                      {...field}
                      onChange={(date) => {
                        setValue('deadline', date?.toFormat('MM/dd/yyyy'));
                      }}
                    />
                  )}
                />
                <FormControl size="small">
                  <InputLabel id="impact">Impact</InputLabel>
                  <Controller
                    control={control}
                    name="impact"
                    defaultValue=""
                    render={({ field }) => (
                      <Select labelId="impact" id="impact" label="Impact" {...field}>
                        {impacts.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl size="small">
                  <InputLabel id="priority">Priority</InputLabel>
                  <Controller
                    control={control}
                    name="priority"
                    defaultValue=""
                    render={({ field }) => (
                      <Select labelId="priority" id="priority" label="Priority" {...field}>
                        {priorities.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl size="small">
                  <InputLabel id="type">Type</InputLabel>
                  <Controller
                    control={control}
                    name="type"
                    defaultValue=""
                    render={({ field }) => (
                      <Select labelId="type" id="type" label="Type" {...field}>
                        {types.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <Box>
                  <Typography>Attachments:</Typography>
                  <Box
                    sx={{
                      padding: '1rem',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      '&:hover': {
                        border: '1px solid rgba(0, 0, 0, 0.87)',
                        '> p': { color: 'rgba(0, 0, 0, 1)' }
                      },
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <Typography color="rgba(0, 0, 0, 0.6)">
                      Drag &apos;n&apos; drop files here or click to select files
                    </Typography>
                  </Box>
                  {acceptedFiles.map((file) => (
                    <Typography key={file.path}>{file.path}</Typography>
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenErrorDialog(false)}>Close</Button>
                <Button type="submit">Confirm</Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      );

    case stepStates.done:
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton
            disabled={Object.values(currentState).some(
              (state) => state === 'error' || currentState[lastStepNumber] === 'done'
            )}
            component="span"
            color="primary"
            size="small"
            onClick={() => clearAction(index)}
          >
            <Done />
          </IconButton>
        </Box>
      );

    case stepStates.error:
      return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton disabled component="span" color="primary" size="small">
            <Error />
          </IconButton>
        </Box>
      );

    default:
      return null;
  }
};

ButtonStepCell.propTypes = {
  index: PropTypes.number.isRequired,
  stepId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  useTableStepsRef: PropTypes.object.isRequired
};
