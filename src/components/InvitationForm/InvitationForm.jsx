import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { invite, logout } from '../../redux/store';

const Form = styled(Box)({
  width: '20rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.8rem'
});

const roles = {
  ProjectManager: 'Project Manager',
  Developer: 'Developer',
  Tester: 'Tester'
};

const formFields = {
  email: 'email',
  role: 'role'
};

const defaultValues = {
  [formFields.email]: '',
  [formFields.role]: ''
};

const schema = yup.object().shape({
  [formFields.email]: yup
    .string()
    .email('Email field must be valid!')
    .required('Email field cannot be empty!')
});

export const InvitationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(invite({ navigate, email, role })).then(({ payload }) => {
      toast.info(
        'Due to this project being only front-end, please click here to register a new user',
        {
          autoClose: false,
          onClick: () => {
            dispatch(logout());
            navigate(`/register/user/${payload.id}`);
          }
        }
      );
    });
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
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
            helperText={!!errors.email && errors.email.message}
            {...field}
          />
        )}
      />
      <InputLabel id="roleLabel">Role</InputLabel>
      <Controller
        name="role"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select labelId="roleLabel" id="role" {...field}>
            {Object.entries(roles).map(([role, label]) => (
              <MenuItem key={role} value={role}>
                {label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Button type="submit" variant="contained" sx={{ height: '3rem' }}>
        Invite
      </Button>
    </Form>
  );
};
