import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Toolbar, Box, IconButton } from '@mui/material';
import { TableRows, Dehaze } from '@mui/icons-material';

import GlobalFilter from './GlobalFilter';

const RowDenseSelector = ({ dense, setDense, shouldSetDense }) => {
  return (
    <IconButton onClick={() => setDense(shouldSetDense)}>
      {shouldSetDense ? (
        <Dehaze sx={{ fontSize: '1.7rem' }} color={dense ? 'primary' : 'action'} />
      ) : (
        <TableRows sx={{ fontSize: '1.7rem' }} color={dense ? 'action' : 'primary'} />
      )}
    </IconButton>
  );
};

RowDenseSelector.propTypes = {
  dense: PropTypes.bool.isRequired,
  setDense: PropTypes.func.isRequired,
  shouldSetDense: PropTypes.bool
};

RowDenseSelector.defaultProps = {
  shouldSetDense: false
};

const TableToolbar = ({
  title,
  setGlobalFilter,
  globalFilter,
  dense,
  setDense,
  toggleAllRowsExpanded
}) => {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '2rem 0'
      }}
    >
      <Typography sx={{ paddingBottom: '1.5rem' }} variant="h3" component="h1" color="primary.dark">
        {title}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          toggleAllRowsExpanded={toggleAllRowsExpanded}
        />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <RowDenseSelector dense={dense} setDense={setDense} />
          <RowDenseSelector dense={dense} setDense={setDense} shouldSetDense />
        </Box>
      </Box>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  globalFilter: PropTypes.string,
  dense: PropTypes.bool.isRequired,
  setDense: PropTypes.func.isRequired,
  toggleAllRowsExpanded: PropTypes.func.isRequired
};

TableToolbar.defaultProps = {
  globalFilter: undefined
};

export default TableToolbar;
