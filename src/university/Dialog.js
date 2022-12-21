/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Slide } from '@mui/material';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SimpleDialog({ content, lskey }) {
  const visited = localStorage.getItem(lskey);
  const [open, setOpen] = React.useState(true);

  if (visited) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(lskey, true);
  };

  return (
    <Dialog TransitionComponent={Transition} keepMounted onClose={handleClose} open={open}>
      <DialogTitle>First visit help</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
