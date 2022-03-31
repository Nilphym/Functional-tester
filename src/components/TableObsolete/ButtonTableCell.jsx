import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, IconButton } from '@mui/material';
import { Settings, Repeat, Done, Error, Add, Clear, NotInterested } from '@mui/icons-material';

const icons = {
  done: <Done />,
  error: <Error />,
  add: <Add />,
  repeat: <Repeat />,
  settings: <Settings />,
  clear: <Clear />,
  cancel: <NotInterested />
};

const ButtonTableCell = ({ icon, onClick, id }) => (
  <TableCell sx={{ width: 0 }} align="center">
    <IconButton
      sx={{ display: 'flex', alignItems: 'center' }}
      onClick={() => onClick(id)}
      component="span"
      color="primary"
      size="small"
    >
      {icons[icon]}
    </IconButton>
  </TableCell>
);

export default ButtonTableCell;

ButtonTableCell.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};
