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

export const TableDataDialog = ({ handleClose, open, data, chosenDataItem, handleShow }) => {
  return (
    <>
      {data.map((dataItem) => (
        <Button
          onClick={() => handleShow(dataItem)}
          key={dataItem.code}
          color="primary"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {dataItem.code}
        </Button>
      ))}
      {chosenDataItem && (
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>{chosenDataItem.name}</DialogTitle>
          {chosenDataItem.table && (
            <DialogContent>
              <TableContainer
                sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {chosenDataItem.table[0].map((heading) => (
                        <TableCell key={heading}>{heading}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chosenDataItem.table.slice(1).map((row) => (
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
  chosenDataItem: PropTypes.object,
  data: PropTypes.array,
  handleShow: PropTypes.func.isRequired
};

TableDataDialog.defaultProps = {
  open: false,
  chosenDataItem: null,
  data: []
};

export default TableDataDialog;
