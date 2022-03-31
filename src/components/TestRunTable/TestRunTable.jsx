import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

export const TestRunTable = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '800px' }} {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  sx={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: column.align,
                    whiteSpace: 'nowrap'
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} hover>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      sx={{
                        minWidth: cell.column.minWidth,
                        maxWidth: cell.column.maxWidth,
                        textAlign: cell.column.align,
                        height: '4.5rem'
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TestRunTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default TestRunTable;
export * from './ButtonStepCell';
export * from './TestDataCell';
export * from './ErrorDataCell';
export * from './TableDataDialog';
