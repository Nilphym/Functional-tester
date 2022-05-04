import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { registerProject } from '../redux/store';
import logo from '../assets/logo/logo2.png';

const Logo = styled('img')({
  width: '12.5rem'
});

const Container = styled(Box)({
  minHeight: '100vh',
  padding: '1rem 0',
  margin: '0 auto',
  width: '20rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem'
});

const Form = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
});

const formFields = {
  projectName: 'projectName',
  name: 'name',
  surname: 'surname',
  email: 'email',
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
  [formFields.projectName]: yup.string().required('Project name field cannot be empty!'),
  [formFields.email]: yup
    .string()
    .email('Email must be valid!')
    .required('Email field cannot be empty'),
  [formFields.name]: yup.string().required('Name field cannot be empty!'),
  [formFields.surname]: yup.string().required('Surname field cannot be empty!'),
  [formFields.password]: yup
    .string()
    .required('Password field cannot be empty!')
    .min(8, 'Password field must contain min. 8 letters!')
    .matches(RegExp('(.*[a-z].*)'), 'Password field must contain min. 1 lowercase letter!')
    .matches(RegExp('(.*[A-Z].*)'), 'Password field must contain min. 1 uppercase letter!')
    .matches(RegExp('(.*\\d.*)'), 'Password field must contain min. 1 digit!')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Password field must contain min. 1 special sign!'),
  [formFields.repeatPassword]: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must be the same!')
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = ({ projectName, name, surname, email, password }) => {
    dispatch(registerProject({ projectName, name, surname, email, password })).finally(() =>
      navigate('/')
    );
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="h2">
        Register Panel
      </Typography>
      <Form component="form" onSubmit={handleSubmit(onSubmit)}>
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
              helperText={!!errors.projectName && errors.projectName.message}
              {...field}
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
              helperText={!!errors.email && errors.email.message}
              {...field}
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
              helperText={!!errors.name && errors.name.message}
              {...field}
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
              helperText={!!errors.surname && errors.surname.message}
              {...field}
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
              helperText={!!errors.password && errors.password.message}
              {...field}
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
                !!errors.repeatPassword || (!!errors.password && errors.repeatPassword.message)
              }
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            height: '3rem'
          }}
        >
          Register
        </Button>
        <Box>
          <Typography>Already have an account?</Typography>
          <Link to="/">Log in</Link>
        </Box>
      </Form>
    </Container>
  );
};
