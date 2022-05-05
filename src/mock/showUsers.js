import { toast } from 'react-toastify';

import server from '../services/server';

export const showUsers = async (onClick) => {
  const getUsers = async () => {
    const users = await server.get({ url: 'https://fun-test-zpi.herokuapp.com/api/all_users' });
    users.forEach((user) => {
      toast.info(`${user.role}: ${user.login}`, {
        autoClose: false,
        closeOnClick: false,
        onClick: (evt) => onClick(evt.target.textContent.split(' ')[1])
      });
    });
  };
  getUsers();

  toast.info('Click on login to autofill');
};
