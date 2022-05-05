import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { invite } from '../../redux/store';
import { Form, SubmitButton } from '../../components/auth_module';
import { PageContainer, ControlledTextField, ControlledSelect } from '../../components/common';
import { createValidator, emailValidator } from '../../validators';
import { showInvitation } from '../../mock/showInvitation';

const roles = {
  ProjectManager: 'Project Manager',
  Developer: 'Developer',
  Tester: 'Tester'
};

const formFields = {
  email: 'email',
  role: 'role'
};

const defaultValues = {
  [formFields.email]: '',
  [formFields.role]: ''
};

const schema = createValidator({
  [formFields.email]: emailValidator
});

export const InvitePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = ({ email, role }) => {
    dispatch(invite({ navigate, email, role })).then((dispatchResult) => {
      showInvitation({
        dispatchResult,
        navigate,
        dispatch
      });
    });

    reset(defaultValues);
  };

  return (
    <PageContainer header="Invite user">
      <Form
        sx={{ width: '20rem', margin: '0 auto', justifyContent: 'center' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledTextField
          id={formFields.email}
          control={control}
          label="Email"
          type="email"
          error={errors.email}
        />
        <ControlledSelect id={formFields.role} control={control} label="Role" options={roles} />
        <SubmitButton>Invite</SubmitButton>
      </Form>
    </PageContainer>
  );
};
