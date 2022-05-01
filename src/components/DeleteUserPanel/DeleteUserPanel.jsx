import { Box, Typography, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, deleteUser } from '../../redux/store';
import UserItem from './UserItem';

const DeleteUserPanel = () => {
  const dispatch = useDispatch();
  const { users, isLoadingUsers } = useSelector((state) => state.auth);
  const [refresh, useRefresh] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [refresh]);

  async function deleteUserById(userName) {
    await dispatch(deleteUser({ userName }));
    // setIsLoadingUsers(true);
    useRefresh((state) => !state);
  }

  return (
    <Box>
      {isLoadingUsers ? (
        <CircularProgress />
      ) : (
        <Box sx={{ marginRight: '50rem' }}>
          <Typography
            sx={{
              userSelect: 'none',
              color: 'rgb(46, 115, 171)',
              fontFamily: 'Roboto',
              fontWeight: '400',
              marginTop: '0.625rem',
              fontSize: '3rem'
            }}
          >
            Users List
          </Typography>
          <Box
            sx={{
              height: '1.5rem',
              width: '50rem',
              position: 'relative',
              marginTop: '1.25rem',
              marginRight: '10rem'
            }}
          >
            <Typography sx={{ fontWeight: '700', position: 'absolute', left: '2%' }}>
              Username
            </Typography>
            <Typography sx={{ fontWeight: '700', position: 'absolute', left: '35%' }}>
              First name
            </Typography>
            <Typography sx={{ fontWeight: '700', position: 'absolute', left: '55%' }}>
              Surname
            </Typography>
          </Box>
          <Box>
            {users.map(({ id, userName, firstName, lastName }) => (
              <UserItem
                userId={id}
                userName={userName}
                userFirstName={firstName}
                userSurname={lastName}
                deleteUser={() => deleteUserById(userName)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DeleteUserPanel;
