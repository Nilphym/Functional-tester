import { string, ref } from 'yup';

export const emailValidator = string()
  .email('Email must be valid!')
  .required('Email field cannot be empty');

export const loginValidator = string().required('Login field cannot be empty!');

export const projectNameValidator = string().required('Project name field cannot be empty!');

export const nameValidator = string().required('Name field cannot be empty!');

export const surnameValidator = string().required('Surname field cannot be empty!');

export const passwordValidator = string()
  .required('Password field cannot be empty!')
  .min(8, 'Password field must contain min. 8 letters!')
  .matches(RegExp('(.*[a-z].*)'), 'Password field must contain min. 1 lowercase letter!')
  .matches(RegExp('(.*[A-Z].*)'), 'Password field must contain min. 1 uppercase letter!')
  .matches(RegExp('(.*\\d.*)'), 'Password field must contain min. 1 digit!')
  .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'Password field must contain min. 1 special sign!');

export const repeatPasswordValidator = string().oneOf(
  [ref('password'), null],
  'Passwords must be the same!'
);
