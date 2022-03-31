import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUserPassword } from '../../redux/store';

import logo from '../../assets/logo/logo2.png';

const Logo = styled('img')({
  width: '12.5rem',
  height: '8vh',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
});

const formFields = {
  password: 'password',
  repeatPassword: 'repeatPassword'
};

const defaultValues = {
  [formFields.password]: '',
  [formFields.repeatPassword]: ''
};

const schema = yup.object().shape({
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

export const ResetPasswordPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, token } = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  function onSubmit({ password, repeatPassword }) {
    dispatch(changeUserPassword({ password, repeatPassword, userId, token }));
    reset(defaultValues, {
      keepIsValid: true
    });
    navigate('/login');
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
          Reset Password
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
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="password"
                label="New Password"
                type="password"
                error={!!errors.password}
                helperText={
                  !!errors.password &&
                  'Password field cannot be empty and must contain min. 6 letters!'
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
                label="Repeat New Password"
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
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordPanel;
