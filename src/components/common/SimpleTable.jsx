import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';

export const SimpleTable = ({ columns, rows }) => {
  return (
    <TableContainer elevation={2} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell {...column.sx}>{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ id, cells }) => (
            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {cells}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.node).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cells: PropTypes.arrayOf(PropTypes.node).isRequired
    }).isRequired
  ).isRequired
};
