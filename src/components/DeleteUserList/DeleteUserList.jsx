import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from '@mui/material';

import { getUsers, deleteUser } from '../../redux/store';

export const DeleteUserList = () => {
  const dispatch = useDispatch();
  const {
    users,
    isLoadingUsers,
    token: { userId }
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
  };

  return isLoadingUsers ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <TableContainer elevation={2} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Login</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell sx={{ width: 0 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter((user) => user.id !== userId)
            .map(({ id, login, name, surname }) => (
              <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {login}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{surname}</TableCell>
                <TableCell>
                  <Button
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={() => handleDelete(id)}
                    variant="contained"
                  >
                    Delete User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
