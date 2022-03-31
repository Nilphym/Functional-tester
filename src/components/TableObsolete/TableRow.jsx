import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  IconButton,
  MenuItem,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { DesktopDatePicker } from '@mui/lab';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';

import EnhancedTableCell from './TableCell';

const Field = ({ id, label, type, content, values }) => {
  const { control, setValue } = useFormContext();
  const [date, setDate] = useState(null);

  switch (type) {
    case 'text':
      return (
        <Controller
          defaultValue={content}
          control={control}
          name={id}
          render={({ field }) => <TextField size="small" id={id} label={label} {...field} />}
        />
      );
    case 'textLarge':
      return (
        <Controller
          control={control}
          defaultValue={content}
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
          defaultValue={content}
          name={id}
          render={({ field }) => (
            <DesktopDatePicker
              label={label}
              inputFormat="MM/dd/yyyy"
              value={date}
              renderInput={(params) => <TextField size="small" {...params} />}
              {...field}
              onChange={(date) => {
                setDate(date);
                setValue(id, date.toLocaleString());
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
            defaultValue={content}
            render={({ field }) => (
              <Select labelId={id} id={id} label={label} {...field}>
                {values.map((value) => (
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
  content: PropTypes.string,
  values: PropTypes.array
};

Field.defaultProps = {
  values: null,
  content: null
};

const EnhancedTableRow = ({
  headCells,
  rowCells,
  row,
  setCollapseDetails,
  collapseDetails,
  onSubmit
}) => {
  const [open, setOpen] = useState(false);
  const formMethods = useForm();
  const { handleSubmit, setValue } = formMethods;

  useEffect(() => {
    setValue('code', row.code);
  }, []);

  useEffect(() => {
    if (collapseDetails) {
      setOpen(false);
      setCollapseDetails(false);
    }
  }, [collapseDetails]);

  return (
    <>
      <TableRow sx={{ height: '4.8rem' }} tabIndex={-1} key={row.code}>
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen((opened) => !opened)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {headCells.map((headCell) => (
          <EnhancedTableCell
            key={headCell.id}
            id={row.id}
            content={row[headCell.id]}
            headCell={headCell}
          />
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={headCells.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    backgroundColor: blue[50],
                    display: 'grid',
                    gridTemplate: 'repeat(5, 1fr) / repeat(4, 1fr) 6rem',
                    gap: '1rem 4rem',
                    padding: '2rem 6rem'
                  }}
                >
                  {[...headCells, ...rowCells]
                    .filter((headCell) => headCell.type)
                    .map(({ id, label, type, values }) => (
                      <Field
                        key={id}
                        id={id}
                        label={label}
                        type={type}
                        content={row[id]}
                        values={values}
                      />
                    ))}
                  <Box sx={{ gridColumn: '5/6', gridRow: '1/5' }} />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ gridColumn: '5/6', gridRow: '5/6' }}
                  >
                    Save
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EnhancedTableRow;

EnhancedTableRow.propTypes = {
  headCells: PropTypes.array.isRequired,
  rowCells: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  setCollapseDetails: PropTypes.func.isRequired,
  collapseDetails: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};
