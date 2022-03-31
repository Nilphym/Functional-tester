import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import React from 'react';

import { login } from '../../redux/store';
import logo from '../../assets/logo/logo2.png';

const Logo = styled('img')({
  width: '12.5rem',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
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
  [formFields.login]: yup.string().required(),
  [formFields.password]: yup
    .string()
    .required()
    .min(8)
    .matches(RegExp('(.*[a-z].*)'), 'Lowercase')
    .matches(RegExp('(.*[A-Z].*)'), 'Uppercase')
    .matches(RegExp('(.*\\d.*)'), 'Number')
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Special')
});

export const LoginPanel = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const from = state ? state.from.pathname : '/dashboard';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = async ({ login: email, password }) => {
    await dispatch(login({ email, password }));

    reset(defaultValues, {
      keepIsValid: true
    });
  };

  const StyledLink = styled(Link)({
    color: 'blue',
    '&:visited': {
      color: 'blue'
    },
    '&:focus, &:hover, &:active': {
      color: 'grey'
    }
  });
  // 1rem <=> 16px
  return isLoggedIn ? (
    <Navigate to={from} replace />
  ) : (
    <Box>
      <Box
        sx={{
          width: '12.5rem',
          height: '8vh',
          position: 'absolute',
          top: '20%',
          left: '49%',
          transform: 'translateX(-50%)'
        }}
      >
        <Logo src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '33%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography align="center" variant="h2" gutterBottom component="div">
          Login Panel
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
            name={formFields.login}
            control={control}
            render={({ field }) => (
              <TextField
                id={formFields.login}
                label="Login"
                type="text"
                error={!!errors.login}
                helperText={!!errors.login && 'Login field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem',
                  width: '21.875rem'
                }}
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
                helperText={
                  !!errors.password &&
                  `Password field cannot be empty and must contain min. 8 letters, 
                  lowercase, uppercase, digit and special sign!`
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0.625rem 0',
                  width: '21.875rem'
                }}
              />
            )}
          />
          <StyledLink to="/register">Register a new product -&gt;</StyledLink>
          <Button
            type="submit"
            variant="contained"
            sx={{
              height: '3.125rem',
              marginTop: '0.625rem',
              marginBottom: '1.25rem'
            }}
          >
            Login
          </Button>
          <Box>
            <Typography>Have you forgot your password?</Typography>
            <StyledLink to="/resetPassword">Reset password</StyledLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPanel;
