import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const ControlledTextField = ({ id, type, control, label, error, disabled }) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <TextField
          id={id}
          type={type}
          label={label}
          error={!!error}
          helperText={!!error && error.message}
          disabled={disabled}
          {...field}
        />
      )}
    />
  );
};

ControlledTextField.propTypes = {
  id: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

ControlledTextField.defaultProps = {
  type: 'text',
  disabled: false
};
