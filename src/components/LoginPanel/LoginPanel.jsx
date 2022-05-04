import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import server from '../../services/server';
import { login } from '../../redux/store';
import logo from '../../assets/logo/logo2.png';

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
  login: 'login',
  password: 'password'
};

const defaultValues = {
  [formFields.login]: '',
  [formFields.password]: ''
};

const schema = yup.object().shape({
  [formFields.login]: yup.string().required('Login field cannot be empty!'),
  [formFields.password]: yup
    .string()
    .required('Password field cannot be empty!')
    .min(8, 'Password field must contain min. 8 letters!')
    .matches(RegExp('(.*[a-z].*)'), 'Password field must contain min. 1 lowercase letter!')
    .matches(RegExp('(.*[A-Z].*)'), 'Password field must contain min. 1 uppercase letter!')
    .matches(RegExp('(.*\\d.*)'), 'Password field must contain min. 1 digit!')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Password field must contain min. 1 special sign!')
});

export const LoginPanel = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const onClick = (evt) => {
      const login = evt.target.textContent.split(' ')[1];
      setValue(formFields.login, login);
      setValue(formFields.password, 'Password123!');
    };

    const getUsers = async () => {
      const users = await server.get({ url: 'https://fun-test-zpi.herokuapp.com/api/users' });
      users.forEach((user) => {
        toast.info(`${user.role}: ${user.login}`, {
          autoClose: false,
          closeOnClick: false,
          onClick
        });
      });
    };
    getUsers();

    toast.info('Click on login to autofill');
  }, []);

  const onSubmit = async ({ login: email, password }) => {
    await dispatch(login({ email, password }));

    reset(defaultValues, {
      keepIsValid: true
    });
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Typography variant="h2">Login Panel</Typography>
      <Form component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={formFields.login}
          control={control}
          render={({ field }) => (
            <TextField
              id={formFields.login}
              label="Login"
              type="text"
              error={!!errors.login}
              helperText={!!errors.login && errors.login.message}
              {...field}
            />
          )}
        />
        <Controller
          name={formFields.password}
          control={control}
          render={({ field }) => (
            <TextField
              id={formFields.password}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={!!errors.password && errors.password.message}
              {...field}
            />
          )}
        />
        <Link to="/register">Register a new product -&gt;</Link>
        <Button
          type="submit"
          variant="contained"
          sx={{
            height: '3rem'
          }}
        >
          Login
        </Button>
        <Box>
          <Typography>Have you forgot your password?</Typography>
          <Link to="/resetPassword">Reset password</Link>
        </Box>
      </Form>
    </Container>
  );
};

export default LoginPanel;
