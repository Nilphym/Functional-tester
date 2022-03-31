import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { changeUserName, changeUserSurname } from '../../redux/store';

const schemaName = yup.object().shape({
  name: yup.string().required()
});

const schemaSurname = yup.object().shape({
  surname: yup.string().required()
});

const schemaPassword = yup.object().shape({
  password: yup.string().required().min(6),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null])
});

export const ChangeUserDataPanel = () => {
  // const dispatch = useDispatch();

  const {
    control: controlName,
    handleSubmit: handleSubmitName,
    reset: resetName,
    formState: { errors: errorsName }
  } = useForm({
    resolver: yupResolver(schemaName)
  });

  const {
    control: controlSurname,
    handleSubmit: handleSubmitSurname,
    reset: resetSurname,
    formState: { errors: errorsSurname }
  } = useForm({
    resolver: yupResolver(schemaSurname)
  });

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword }
  } = useForm({
    resolver: yupResolver(schemaPassword)
  });

  function onSubmitName() {
    // dispatch(changeUserName({ name }));
    resetName(
      { name: '' },
      {
        keepIsValid: true
      }
    );
    // navigate TODO: Ew
  }

  function onSubmitSurname() {
    // dispatch(changeUserSurname({ surname }));
    resetSurname(
      { surname: '' },
      {
        keepIsValid: true
      }
    );
    // navigate TODO: Ew
  }

  function onSubmitPassword() {
    // dispatch(changeUserPasswordById({ password }));
    resetPassword(
      { password: '', repeatPassword: '' },
      {
        keepIsValid: true
      }
    );
    // navigate TODO: Ew
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '45.0625rem',
        minWidth: '30rem'
      }}
    >
      <Typography
        align="center"
        variant="h2"
        gutterBottom
        component="div"
        sx={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        Change User Data
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitName(onSubmitName)}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Controller
            name="name"
            control={controlName}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="name"
                label="Name"
                type="text"
                error={!!errorsName.name}
                helperText={!!errorsName.name && 'Name field cannot be empty!'}
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
          >
            Change Name
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
        component="form"
        onSubmit={handleSubmitSurname(onSubmitSurname)}
      >
        <Controller
          name="surname"
          control={controlSurname}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="surname"
              label="Surname"
              type="text"
              error={!!errorsSurname.surname}
              helperText={!!errorsSurname.surname && 'Surname field cannot be empty!'}
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
        >
          Change Surname
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        sx={{
          position: 'absolute',
          top: '65%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Controller
          name="password"
          control={controlPassword}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="password"
              label="New Password"
              type="password"
              error={!!errorsPassword.password}
              helperText={
                !!errorsPassword.password &&
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
          control={controlPassword}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="repeatPassword"
              label="Repeat New Password"
              type="password"
              error={!!errorsPassword.repeatPassword || !!errorsPassword.password}
              helperText={
                !!errorsPassword.repeatPassword ||
                (!!errorsPassword.password && 'Passwords must be the same!')
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
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeUserDataPanel;
