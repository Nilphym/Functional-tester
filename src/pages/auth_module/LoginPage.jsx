import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { login } from '../../redux/store';
import {
  Form,
  Container,
  Header,
  PasswordResetLink,
  SubmitButton,
  RegisterProductLink
} from '../../components/auth_module';
import { Logo, ControlledTextField } from '../../components/common';
import { createValidator, loginValidator, passwordValidator } from '../../validators';
import { showUsers } from '../../mock/showUsers';
import { defaultPassword } from '../../mock/constants';

const formFields = {
  login: 'login',
  password: 'password'
};

const defaultValues = {
  [formFields.login]: '',
  [formFields.password]: ''
};

const schema = createValidator({
  [formFields.login]: loginValidator,
  [formFields.password]: passwordValidator
});

export const LoginPage = () => {
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
    showUsers((login) => {
      setValue(formFields.login, login);
      setValue(formFields.password, defaultPassword);
    });
  }, []);

  const onSubmit = ({ login: email, password }) => {
    dispatch(login({ email, password }));

    reset(defaultValues, {
      keepIsValid: true
    });
  };

  return (
    <Container>
      <Logo />
      <Header>Login Panel</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          id={formFields.login}
          control={control}
          label="Login"
          error={errors.login}
        />
        <ControlledTextField
          id={formFields.password}
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />
        <RegisterProductLink />
        <SubmitButton>Login</SubmitButton>
        <PasswordResetLink />
      </Form>
    </Container>
  );
};

export default LoginPage;
