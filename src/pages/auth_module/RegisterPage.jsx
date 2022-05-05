import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerProject } from '../../redux/store';
import { Form, Container, Header, GoToLoginLink, SubmitButton } from '../../components/auth_module';
import { Logo, ControlledTextField } from '../../components/common';
import {
  createValidator,
  projectNameValidator,
  emailValidator,
  nameValidator,
  surnameValidator,
  passwordValidator,
  repeatPasswordValidator
} from '../../validators';

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

const schema = createValidator({
  [formFields.projectName]: projectNameValidator,
  [formFields.email]: emailValidator,
  [formFields.name]: nameValidator,
  [formFields.surname]: surnameValidator,
  [formFields.password]: passwordValidator,
  [formFields.repeatPassword]: repeatPasswordValidator
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
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = ({ projectName, name, surname, email, password }) => {
    dispatch(registerProject({ projectName, name, surname, email, password }))
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        reset(defaultValues);
      });
  };

  return (
    <Container>
      <Logo />
      <Header>Register Panel</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          id={formFields.projectName}
          control={control}
          label="Project name"
          error={errors.projectName}
        />
        <ControlledTextField
          id={formFields.email}
          control={control}
          label="Email"
          type="email"
          error={errors.email}
        />
        <ControlledTextField
          id={formFields.name}
          control={control}
          label="Name"
          error={errors.name}
        />
        <ControlledTextField
          id={formFields.surname}
          control={control}
          label="Surname"
          error={errors.surname}
        />
        <ControlledTextField
          id={formFields.password}
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />
        <ControlledTextField
          id={formFields.repeatPassword}
          control={control}
          label="Repeat password"
          type="password"
          error={errors.repeatPassword}
        />
        <SubmitButton>Register</SubmitButton>
        <GoToLoginLink />
      </Form>
    </Container>
  );
};
