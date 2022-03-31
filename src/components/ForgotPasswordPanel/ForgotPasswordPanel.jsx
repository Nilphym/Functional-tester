import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/store';

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
  email: 'email',
  username: 'username'
};

const defaultValues = {
  [formFields.email]: '',
  [formFields.username]: ''
};

const schema = yup.object().shape({
  [formFields.email]: yup.string().email().required(),
  [formFields.username]: yup.string().required()
});

export const ForgotPasswordPanel = () => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  function onSubmit({ email, username }) {
    dispatch(forgotPassword({ email, username }));
    reset(defaultValues, {
      keepIsValid: true
    });
    setIsDisabled(true);
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
          Forgot Password
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
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="username"
                label="Username"
                type="text"
                error={!!errors.username}
                helperText={
                  !!errors.username &&
                  'Username cannot be empty!'
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0 0'
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              height: '3.125rem',
              marginTop: '0.625rem'
            }}
            disabled={isDisabled}
          >
            Send
          </Button>
        </Box>
        <Box>
          {isDisabled && <Typography>On your email was sent a reset password link. Please, check it.</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPanel;
