import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper
} from '@mui/material';

import EnhancedTableHead from './TableHead';
import EnhancedTableRow from './TableRow';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const EnhancedTable = ({ headCells, rowCells, rows, rowsPerPageOptions, onSubmit }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(headCells[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [collapseDetails, setCollapseDetails] = useState(false);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setCollapseDetails(true);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
    setCollapseDetails(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const adjustPerPageRowsOptions = (rowsPerPageOptions, rowsNumber) => {
    const adjustedRowsPerPageOptions = [];

    rowsPerPageOptions.forEach((interval) => {
      if (interval <= rowsNumber) {
        adjustedRowsPerPageOptions.push(interval);
      } else if (rowsPerPageOptions.at(-1) !== rowsNumber) {
        adjustedRowsPerPageOptions.push(rowsNumber);
      }
    });

    return adjustedRowsPerPageOptions;
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {rows
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <EnhancedTableRow
                  key={row.id}
                  headCells={headCells}
                  rowCells={rowCells}
                  row={row}
                  setCollapseDetails={setCollapseDetails}
                  collapseDetails={collapseDetails}
                  onSubmit={onSubmit}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 77.8 * emptyRows }}>
                <TableCell colSpan={headCells.length + 1} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={adjustPerPageRowsOptions(rowsPerPageOptions, rows.length)}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EnhancedTable;

EnhancedTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rowCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPageOptions: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
};
