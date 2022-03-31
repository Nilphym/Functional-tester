import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import TableDataDialog from './TableDataDialog';

export const TestDataCell = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [chosenDataItem, setChosenDataItem] = useState(null);

  const handleTestDataShow = (dataItem) => {
    setChosenDataItem(dataItem);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <TableDataDialog
        data={data}
        chosenDataItem={chosenDataItem}
        handleShow={handleTestDataShow}
        open={open}
        handleClose={() => setOpen(false)}
        content={chosenDataItem}
      />
    </Box>
  );
};

TestDataCell.propTypes = {
  data: PropTypes.array
};

TestDataCell.defaultProps = {
  data: []
};

export default TestDataCell;
