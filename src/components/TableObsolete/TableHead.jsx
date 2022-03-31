import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel, Typography, Box } from '@mui/material';

const EnhancedTableHead = ({ order, orderBy, onRequestSort, headCells }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map(({ id, label, sublabel, button, unsortable, alignCenter }) => (
          <TableCell
            key={id}
            sortDirection={orderBy === id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            {button || unsortable ? (
              <Box sx={{ position: 'relative' }}>
                <Typography
                  align={alignCenter ? 'center' : 'left'}
                  sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
                >
                  {label}
                </Typography>
                {sublabel && (
                  <Typography
                    align={alignCenter ? 'center' : 'left'}
                    sx={{
                      width: '6rem',
                      fontSize: '0.7rem',
                      position: 'absolute',
                      left: '50%',
                      bottom: '-60%',
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    {sublabel}
                  </Typography>
                )}
              </Box>
            ) : (
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
              >
                {label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'dsc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  headCells: PropTypes.array.isRequired
};
