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

import EnhancedTableCell from './TableCell';

const Field = ({ id, label, type, content, values }) => {
  switch (type) {
    case 'text':
      return <TextField size="small" id={id} label={label} defaultValue={content} />;
    case 'textLarge':
      return (
        <TextField
          sx={{ gridColumn: 'span 5', gridRow: 'span 2' }}
          multiline
          rows={3}
          id={id}
          label={label}
          defaultValue={content}
        />
      );
    case 'date':
      return (
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          value={content}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      );
    case 'select':
      return (
        <FormControl size="small">
          <InputLabel id={id}>{label}</InputLabel>
          <Select labelId={id} id={id} defaultValue={content} label={label}>
            {values.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      throw new Error('Wrong field type');
  }
};

Field.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  values: PropTypes.array
};

Field.defaultProps = {
  values: undefined
};

const EnhancedTableRow = ({ headCells, rowCells, row, setCollapseDetails, collapseDetails }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (collapseDetails) {
      setOpen(false);
      setCollapseDetails(false);
    }
  }, [collapseDetails]);

  return (
    <>
      <TableRow tabIndex={-1} key={row.id}>
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {headCells.map((headCell) => (
          <EnhancedTableCell key={headCell.id} content={row[headCell.id]} headCell={headCell} />
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={headCells.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                backgroundColor: blue[50],
                display: 'grid',
                gridTemplate: 'repeat(5, 1fr) / repeat(5, 1fr) 6rem',
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
              <Box sx={{ gridColumn: '6/7', gridRow: '1/5' }} />
              <Button variant="contained" sx={{ gridColumn: '6/7', gridRow: '5/6' }}>
                Save
              </Button>
            </Box>
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
  collapseDetails: PropTypes.func.isRequired
};
