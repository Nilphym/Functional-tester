import { Box, Button, TextField, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import React from 'react';

import { inviteUser } from '../../redux/store';

const roles = ['Project Manager', 'Developer', 'Tester'];

const formFields = {
  email: 'email',
  role: 'role'
};

const defaultValues = {
  [formFields.email]: '',
  [formFields.role]: ''
};

const schema = yup.object().shape({
  [formFields.email]: yup.string().email().required()
});

export const InviteUserToProjectPanel = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = ({ email, role }) => {
    dispatch(inviteUser({ email, role }));
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        position: 'absolute',
        top: '23%',
        left: '50%',
        width: '21.875rem',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography align="center" variant="h2" gutterBottom component="div">
        Add user to the project
      </Typography>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            id="email"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={!!errors.email && 'Email field cannot be empty and must be in pattern!'}
            {...field}
            sx={{
              marginTop: '0.625rem'
            }}
          />
        )}
      />
      <InputLabel
        sx={{
          marginTop: '0.625rem'
        }}
        id="roleSelect-label"
      >
        Role
      </InputLabel>
      <Controller
        name="role"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            labelId="procedureSelect-label"
            id="roleSelect"
            sx={{ width: '21.875rem' }}
            {...field}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          height: '3.125rem',
          marginTop: '0.625rem'
        }}
      >
        Invite
      </Button>
    </Box>
  );
};

export default InviteUserToProjectPanel;
