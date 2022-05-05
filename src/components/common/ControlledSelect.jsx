import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

export const ControlledSelect = ({ id, control, label, options }) => {
  return (
    <>
      <InputLabel id={`${id}Label`}>{label}</InputLabel>
      <Controller
        name={id}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select labelId={`${id}Label`} id={id} {...field}>
            {Object.entries(options).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </>
  );
};

ControlledSelect.propTypes = {
  id: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};
