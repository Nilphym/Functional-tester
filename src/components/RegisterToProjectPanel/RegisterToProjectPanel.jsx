import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import React from 'react';
import { register } from '../../redux/store';
import logo from '../../assets/logo/logo2.png';

const Logo = styled('img')({
  width: '200px',
  height: '8vh',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
});

const formFields = {
  name: 'name',
  surname: 'surname',
  password: 'password',
  repeatPassword: 'repeatPassword'
};

const defaultValues = {
  [formFields.name]: '',
  [formFields.surname]: '',
  [formFields.password]: '',
  [formFields.repeatPassword]: ''
};

const schema = yup.object().shape({
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

export const RegisterToProjectPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, productIdEncoded, emailEncoded } = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  async function onSubmit({ name, surname, password }) {
    const username = await dispatch(
      register({ name, surname, password, role, productIdEncoded, emailEncoded })
    );
    reset(defaultValues, {
      keepIsValid: true
    });
    console.log(username);
    navigate(`/welcome/${username.payload}`);
  }

  return (
    <Box>
      <Box
        sx={{
          width: '12.5rem',
          height: '8vh',
          position: 'absolute',
          top: '10%',
          left: '48%',
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
          width: '25rem',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column'
        }}
      >
        <Typography align="center" variant="h3" gutterBottom component="div">
          Register User from Invitation
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
                  (!!errors.repeatPassword || !!errors.password) && 'Passwords must be the same!'
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
            Register User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterToProjectPanel;
