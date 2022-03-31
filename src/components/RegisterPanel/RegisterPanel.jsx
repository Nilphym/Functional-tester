import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';

import logo from '../../assets/logo/logo2.png';
import { register } from '../../redux/store';

const Logo = styled('img')({
  width: '12.5rem',
  height: '8vh',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
});

const formFields = {
  projectName: 'projectName',
  email: 'email',
  name: 'name',
  surname: 'surname',
  password: 'password',
  repeatPassword: 'repeatPassword'
};

const defaultValues = {
  [formFields.projectName]: '',
  [formFields.email]: '',
  [formFields.name]: '',
  [formFields.surname]: '',
  [formFields.password]: '',
  [formFields.repeatPassword]: ''
};

const schema = yup.object().shape({
  [formFields.projectName]: yup.string().required(),
  [formFields.email]: yup.string().email().required(),
  [formFields.name]: yup.string().required(),
  [formFields.surname]: yup.string().required(),
  [formFields.password]: yup
    .string()
    .required()
    .min(8)
    .matches(RegExp('(.*[a-z].*)'), 'Lowercase')
    .matches(RegExp('(.*[A-Z].*)'), 'Uppercase')
    .matches(RegExp('(.*\\d.*)'), 'Number')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special'),
  [formFields.repeatPassword]: yup.string().oneOf([yup.ref('password'), null])
});

export const RegisterPanel = () => {
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

  async function onSubmit({ projectName, name, surname, email, password }) {
    await dispatch(register({ projectName, name, surname, email, password }));
    navigate('/');
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  return (
    <Box>
      <Box
        sx={{
          width: '12.5rem',
          height: '8vh',
          position: 'absolute',
          top: '10%',
          left: '49%',
          transform: 'translateX(-50%)'
        }}
      >
        <Logo src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '23%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography align="center" variant="h2" gutterBottom component="div">
          Register Panel
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Controller
            name="projectName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="projectName"
                label="Project Name"
                type="text"
                error={!!errors.projectName}
                helperText={!!errors.projectName && 'Project Name field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem'
                }}
              />
            )}
          />
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
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="name"
                label="Name"
                type="text"
                error={!!errors.name}
                helperText={!!errors.name && 'Name field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem'
                }}
              />
            )}
          />
          <Controller
            name="surname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="surname"
                label="Surname"
                type="text"
                error={!!errors.surname}
                helperText={!!errors.surname && 'Surname field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem'
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="password"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={
                  !!errors.password &&
                  `Password field cannot be empty and must contain min. 8 letters, 
                  lowercase, uppercase, digit and special sign!`
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0 0'
                }}
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="repeatPassword"
                label="Repeat Password"
                type="password"
                error={!!errors.repeatPassword || !!errors.password}
                helperText={
                  !!errors.repeatPassword || (!!errors.password && 'Passwords must be the same!')
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0.625rem 0'
                }}
              />
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
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPanel;
