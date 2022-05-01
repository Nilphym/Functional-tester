import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';
import { blue } from '@mui/material/colors';
import { DatePicker } from '@mui/lab';
import { styled } from '@mui/system';
import { DateTime } from 'luxon';
import { useDropzone } from 'react-dropzone';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  MenuItem,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  Typography,
  Divider
} from '@mui/material';

import getImageName from '../../utils/getImageName';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { uploadImage } from '../../redux/store';

const TextButton = styled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  alignSelf: 'start',
  padding: '0',
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.dark
  }
}));

const Field = ({ id, label, type, value, possibleValues }) => {
  const { control, setValue } = useFormContext();
  if (type === 'disabled' && value === null) {
    return null;
  }

  switch (type) {
    case 'disabled': {
      return DateTime.fromFormat(value, 'MM/dd/yyyy').isValid ? (
        <DatePicker
          label={label}
          value={value}
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField size="small" {...params} />}
          onChange={() => null}
          disabled
        />
      ) : (
        <TextField disabled size="small" id={id} label={label} value={value} />
      );
    }
    case 'text':
      return (
        <Controller
          defaultValue={value}
          control={control}
          name={id}
          render={({ field }) => <TextField size="small" id={id} label={label} {...field} />}
        />
      );
    case 'textLarge':
      return (
        <Controller
          control={control}
          defaultValue={value}
          name={id}
          render={({ field }) => (
            <TextField
              sx={{ gridColumn: 'span 4', gridRow: 'span 2' }}
              multiline
              rows={3}
              id={id}
              label={label}
              {...field}
            />
          )}
        />
      );
    case 'date':
      return (
        <Controller
          control={control}
          defaultValue={value}
          name={id}
          render={({ field }) => (
            <DatePicker
              label={label}
              inputFormat="MM/dd/yyyy"
              renderInput={(params) => <TextField size="small" {...params} />}
              {...field}
              onChange={(date) => {
                setValue(id, date?.toFormat('MM/dd/yyyy'));
              }}
            />
          )}
        />
      );
    case 'select':
      return (
        <FormControl size="small">
          <InputLabel id={id}>{label}</InputLabel>
          <Controller
            control={control}
            name={id}
            defaultValue={value}
            render={({ field }) => (
              <Select labelId={id} id={id} label={label} {...field}>
                {possibleValues.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      );
    default:
      throw new Error('Wrong field type');
  }
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  possibleValues: PropTypes.array
};

Field.defaultProps = {
  possibleValues: [],
  value: null
};

const ExpandableRow = ({ colSpan, data, open }) => {
  const formMethods = useForm();
  const dispatch = useDispatch();
  const { handleSubmit, setValue } = formMethods;
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselStartingPosition, setCarouselStartingPosition] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const regex = new RegExp(/(data:\w+\/\w+;base64,)(.+)/gm);
        dispatch(
          uploadImage({
            bugId: data.id,
            imageBase64: regex.exec(reader.result)[2],
            imageName: file.name.split('.')[0]
          })
        );
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const toggleCarousel = (state, index) => {
    setCarouselStartingPosition(index);
    setCarouselOpen(state);
  };

  useEffect(() => {
    setValue('id', data.id);
  }, []);

  return (
    <TableRow>
      <TableCell sx={{ padding: 0, backgroundColor: blue[50] }} colSpan={colSpan}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(data.submitHandler)}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplate: 'repeat(4, 1fr) / repeat(4, 1fr) 6rem',
                  gap: '1rem 2rem',
                  padding: '2rem 4rem'
                }}
              >
                {data.fields
                  .filter((field) => field.type !== 'attachments')
                  .map(({ id, label, type, value, possibleValues }) => (
                    <Field
                      key={id}
                      id={id}
                      label={label}
                      type={type}
                      value={value}
                      possibleValues={possibleValues}
                    />
                  ))}
                <Box sx={{ gridColumn: '5/6', gridRow: '1/5' }} />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ gridColumn: '5/6', gridRow: '4/5' }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </FormProvider>
          {data.fields
            .filter((field) => field.type === 'attachments')
            .map(({ value }) => (
              <React.Fragment key={value}>
                <Divider />
                <Box
                  sx={{
                    padding: '1rem 4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left',
                    gap: '0.5rem'
                  }}
                >
                  <Typography variant="overline">Attachments</Typography>
                  {value.map(({ id, url }, index) => (
                    <TextButton key={id} onClick={() => toggleCarousel(true, index)}>
                      {getImageName(url)}
                    </TextButton>
                  ))}
                  <Box
                    sx={{
                      padding: '1rem',
                      marginTop: '0.5rem',
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
                </Box>
                <Dialog onClose={() => toggleCarousel(false)} open={carouselOpen}>
                  <ImageCarousel
                    closeCarousel={() => toggleCarousel(false)}
                    bugId={data.id}
                    images={value}
                    startingPosition={carouselStartingPosition}
                  />
                </Dialog>
              </React.Fragment>
            ))}
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default ExpandableRow;

ExpandableRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    submitHandler: PropTypes.func.isRequired
  }).isRequired,
  open: PropTypes.bool
};

ExpandableRow.defaultProps = {
  open: false
};
