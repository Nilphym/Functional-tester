import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableCell, Button } from '@mui/material';

import { getUsers, deleteUser } from '../../redux/store';
import { SimpleTable, Loader, PageContainer } from '../../components/common';

export const DeleteUserPage = () => {
  const dispatch = useDispatch();
  const {
    users,
    loading,
    token: { userId }
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
  };

  return (
    <PageContainer header="Users list">
      <Loader loading={loading}>
        <SimpleTable
          columns={[
            <TableCell>Login</TableCell>,
            <TableCell>Name</TableCell>,
            <TableCell>Surname</TableCell>,
            <TableCell sx={{ width: 0 }} />
          ]}
          rows={users
            .filter((user) => user.id !== userId)
            .map(({ id, login, name, surname }) => ({
              id,
              cells: [
                <TableCell component="th" scope="row">
                  {login}
                </TableCell>,
                <TableCell>{name}</TableCell>,
                <TableCell>{surname}</TableCell>,
                <TableCell>
                  <Button
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={() => handleDelete(id)}
                    variant="contained"
                  >
                    Delete User
                  </Button>
                </TableCell>
              ]
            }))}
        />
      </Loader>
    </PageContainer>
  );
};
