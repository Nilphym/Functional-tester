import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAsyncDebounce } from 'react-table';

export const DefaultFilter = ({ column: { filterValue, setFilter } }) => {
  const [inputContent, setInputContent] = useState(filterValue || '');

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);

  return (
    <TextField
      size="small"
      value={inputContent}
      onClick={(e) => e.stopPropagation()}
      onChange={(evt) => {
        setInputContent(evt.target.value);
        onChange(evt.target.value);
      }}
      InputProps={{
        startAdornment: !inputContent && (
          <InputAdornment position="start">
            <Search color="action" sx={{ height: '25px' }} />
          </InputAdornment>
        )
      }}
      sx={{
        '.MuiInputBase-root': {
          height: '2.2rem',
          paddingLeft: inputContent ? 0 : '0.5rem'
        }
      }}
    />
  );
};

DefaultFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired
  }).isRequired
};

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      value={filterValue ?? ''}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      sx={{
        height: '2.2rem',
        width: '7rem'
      }}
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

SelectColumnFilter.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    preFilteredRows: PropTypes.array.isRequired
  }).isRequired
};
