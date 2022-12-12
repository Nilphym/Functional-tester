import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import TableDataDialog from './TableDataDialog';

export const TestDataCell = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [chosenItem, setChosenItem] = useState(null);

  const handleTestDataShow = (item) => {
    setChosenItem(item);
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
        open={open}
        data={data?.map((item) => ({ ...item, code: item.name })) || []}
        chosenItem={chosenItem}
        handleShow={handleTestDataShow}
        handleClose={() => setOpen(false)}
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
