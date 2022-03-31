import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const UserItem = ({ userFirstName, userName, userSurname, deleteUser }) => {
  return (
    <Box
      sx={{
        height: '4rem',
        width: '50rem',
        position: 'relative',
        borderTop: '0.0625rem solid #aeaeae',
        borderBottom: '0.0625rem solid #aeaeae',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
      }}
    >
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          transform: 'translateY(-50%)'
        }}
      >
        {userName}
      </Typography>
      <Typography
        sx={{ position: 'absolute', top: '50%', left: '35%', transform: 'translateY(-50%)' }}
      >
        {userFirstName}
      </Typography>
      <Typography
        sx={{ position: 'absolute', top: '50%', left: '55%', transform: 'translateY(-50%)' }}
      >
        {userSurname}
      </Typography>
      <Button
        onClick={() => deleteUser()}
        variant="contained"
        sx={{
          bgcolor: '#aeaeae',
          position: 'absolute',
          top: '50%',
          left: '80%',
          transform: 'translateY(-50%)',
          '&:hover': {
            bgcolor: '#aeaeae'
          }
        }}
      >
        Delete User
      </Button>
    </Box>
  );
};

UserItem.propTypes = {
  userFirstName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userSurname: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UserItem;
