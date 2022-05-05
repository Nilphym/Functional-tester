import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import { getInvitation, register } from '../../redux/store';
import { Form, Container, Header, GoToLoginLink, SubmitButton } from '../../components/auth_module';
import { Logo, ControlledTextField } from '../../components/common';
import {
  createValidator,
  emailValidator,
  nameValidator,
  surnameValidator,
  passwordValidator,
  repeatPasswordValidator
} from '../../validators';

const formFields = {
  email: 'email',
  name: 'name',
  surname: 'surname',
  password: 'password',
  repeatPassword: 'repeatPassword'
};

const defaultValues = {
  [formFields.email]: '',
  [formFields.name]: '',
  [formFields.surname]: '',
  [formFields.password]: '',
  [formFields.repeatPassword]: ''
};

const schema = createValidator({
  [formFields.email]: emailValidator,
  [formFields.name]: nameValidator,
  [formFields.surname]: surnameValidator,
  [formFields.password]: passwordValidator,
  [formFields.repeatPassword]: repeatPasswordValidator
});

export const RegisterFromInvitationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const { invitation } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    toast.dismiss();
    dispatch(getInvitation({ id: invitationId })).then(({ payload }) => {
      setValue(formFields.email, payload.email);
    });
  }, []);

  const onSubmit = ({ email, name, surname, password }) => {
    dispatch(
      register({
        projectId: invitation.project.id,
        email,
        name,
        surname,
        password,
        role: invitation.role
      })
    )
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
      <Form component="form" onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          id={formFields.email}
          control={control}
          label="Email"
          type="email"
          error={errors.email}
          disabled
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
