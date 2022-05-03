import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';

export const TableDataDialog = ({ open, data, chosenItem, handleShow, handleClose }) => {
  return (
    <>
      {data.map((item) => (
        <Button
          onClick={() => handleShow(item)}
          key={item.code}
          color="primary"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {item.code}
        </Button>
      ))}
      {chosenItem && (
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>{chosenItem.name}</DialogTitle>
          {chosenItem.table && (
            <DialogContent>
              <TableContainer
                sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {chosenItem.table[0].map((heading) => (
                        <TableCell key={heading}>{heading}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chosenItem.table.slice(1).map((row) => (
                      <TableRow key={row[0]}>
                        {row.map((value) => (
                          <TableCell key={value}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

TableDataDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  chosenItem: PropTypes.object,
  data: PropTypes.array,
  handleShow: PropTypes.func.isRequired
};

TableDataDialog.defaultProps = {
  open: false,
  chosenItem: null,
  data: []
};

export default TableDataDialog;
