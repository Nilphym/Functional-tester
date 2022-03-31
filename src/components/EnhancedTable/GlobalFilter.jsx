import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { InputBase, Box, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ globalFilter, setGlobalFilter, toggleAllRowsExpanded }) => {
  const [inputContent, setInputContent] = useState(globalFilter);
  const inputRef = useRef(null);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  return (
    <Box>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: '25rem' }}
      >
        <Search
          onClick={focusOnInput}
          color="action"
          sx={{ fontSize: '2.75rem', padding: '0.625rem' }}
        />
        <InputBase
          value={inputContent}
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by any parameter..."
          onChange={(evt) => {
            setInputContent(evt.target.value);
            onChange(evt.target.value);
            toggleAllRowsExpanded(false);
          }}
        />
      </Paper>
    </Box>
  );
};

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
  toggleAllRowsExpanded: PropTypes.func.isRequired
};

GlobalFilter.defaultProps = { globalFilter: '' };

export default GlobalFilter;
