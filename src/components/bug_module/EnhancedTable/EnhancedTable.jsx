import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useExpanded
} from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableContainer,
  TableSortLabel,
  Paper,
  Box,
  Typography
} from '@mui/material';

import TablePagination from './TablePagination';
import TableToolbar from './TableToolbar';
import ExpandableRow from './ExpandableRow';
import { DefaultFilter } from './CustomFilter';

export const EnhancedTable = ({ title, data, columns, initialPageSize }) => {
  const defaultColumn = useMemo(() => ({ Filter: DefaultFilter }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    setPageSize,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    toggleAllRowsExpanded,
    visibleColumns,
    state: { pageIndex, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: initialPageSize },
      getSubRows: (row) => row.subRows
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  const [dense, setDense] = useState(false);

  const setDenseAndPageSize = (value) => {
    setDense(value);
    toggleAllRowsExpanded(false);
    if (value) {
      setPageSize(initialPageSize + 1);
    } else {
      setPageSize(initialPageSize);
    }
  };

  return (
    <TableContainer
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr'
      }}
    >
      <TableToolbar
        title={title}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        dense={dense}
        setDense={setDenseAndPageSize}
        toggleAllRowsExpanded={toggleAllRowsExpanded}
      />
      <Table size={dense ? 'small' : 'medium'} {...getTableProps()}>
        <Paper component={TableHead} elevation={2} square>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  sx={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: column.align
                  }}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {column.disableFilters ? null : (
                    <>
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                      <Box height="0.6rem" />
                      {column.render('Filter')}
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Paper>
        <TableBody {...getTableBodyProps()}>
          {page.length ? (
            page.map((row) => {
              prepareRow(row);
              return row.originalSubRows ? (
                <React.Fragment key={row.getRowProps().key}>
                  <TableRow role={row.getRowProps().role}>
                    {row.cells.map((cell) => (
                      <TableCell
                        sx={{
                          minWidth: cell.column.minWidth,
                          maxWidth: cell.column.maxWidth,
                          textAlign: cell.column.align
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  <ExpandableRow
                    colSpan={visibleColumns.length}
                    data={row.originalSubRows[0]}
                    open={row.isExpanded}
                  />
                </React.Fragment>
              ) : null;
            })
          ) : (
            <TableRow>
              <TableCell colSpan={visibleColumns.length}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ fontSize: '1rem' }} variant="overline">
                    No data
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={Object.keys(columns).length}>
              <TablePagination
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                page={pageIndex}
                onPageChange={gotoPage}
                preGlobalFilteredRows={preGlobalFilteredRows}
                title={title}
                toggleAllRowsExpanded={toggleAllRowsExpanded}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  initialPageSize: PropTypes.number.isRequired
};

export default EnhancedTable;
export { EnhancedIconButton, enhancedButtonIcons } from './EnhancedIconButton';
export { SelectColumnFilter } from './CustomFilter';
