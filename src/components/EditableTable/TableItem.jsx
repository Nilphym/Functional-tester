import React from 'react';
import { Box, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  textFieldBasic: {
    '& input': {
      color: 'black',
      textAlign: 'center',
      fontSize: '14px'
    },
    '& input:disabled': {
      '-webkit-text-fill-color': 'rgba(0,0,0,0.7)'
    }
  },
  textFieldRow: {
    '& input': {
      color: 'black',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '16px'
    },
    '& input:disabled': {
      '-webkit-text-fill-color': 'rgba(0,0,0,0.7)'
    }
  }
}));

const TableItem = ({ name, row, column, control, disabled, defaultValue }) => {
  const classes = useStyles();
  return (
    <Box
      sx={
        row === 0
          ? {
              border: '0.0625rem dotted black',
              // borderTop: '0',
              // borderLeft: '0',
              // borderRight: '0',
              backgroundColor: '#bdbdbd',
              width: '7rem',
              height: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }
          : {
              border: '0.0625rem solid #b0bec5',
              width: '7rem',
              height: '2.2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }
      }
    >
      <Controller
        shouldUnregister
        name={`${name}-${row}-${column}`}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) =>
          // row === 0 && column === 0 ? (
          //   <TextField
          //     id={`${name}-${row}-${column}`}
          //     type="text"
          //     disabled={disabled}
          //     placeholder=""
          //     required
          //     {...field}
          //     className={row === 0 ? classes.textFieldRow : classes.textFieldBasic}
          //     InputProps={{ disableUnderline: true }}
          //     variant="standard"
          //   />
          // ) : (
            <TextField
              id={`${name}-${row}-${column}`}
              type="text"
              disabled={disabled}
              placeholder={(row === 0 && 'Column Name') || (column === 0 && 'Row Name')}
              required
              {...field}
              className={row === 0 ? classes.textFieldRow : classes.textFieldBasic}
              InputProps={{ disableUnderline: true }}
              variant="standard"
            />
          // )
        }
      />
    </Box>
  );
};

TableItem.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string.isRequired
};

export default TableItem;
