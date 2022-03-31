import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import getImageName from '../../utils/getImageName';
import { getBug, evaluateBug } from '../../redux/store';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';

const Bold = styled('span')({
  fontWeight: 'bold'
});

const TextButton = styled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  alignSelf: 'start',
  padding: '0',
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.dark
  }
}));

const BugDetailsModal = ({ handleClose, open }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselStartingPosition, setCarouselStartingPosition] = useState(0);
  const { id, name, description, functionality, type, attachments } = useSelector(
    (state) => state.bugs.bugDetails
  );
  const dispatch = useDispatch();

  const handleEvaluate = (result) => {
    dispatch(evaluateBug({ errorId: id, result }));
    handleClose();
  };

  const toggleCarousel = (state, index) => {
    setCarouselStartingPosition(index);
    setCarouselOpen(state);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Error details</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography>
            <Bold>Name: </Bold>
            {name}
          </Typography>
          <Typography>
            <Bold>Description: </Bold>
            {description}
          </Typography>
          <Typography>
            <Bold>Functionality: </Bold>
            {functionality}
          </Typography>
          <Typography>
            <Bold>Type: </Bold>
            {type}
          </Typography>
          <Typography>
            <Bold>Attachments:</Bold>
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '2rem', gap: '0.5rem' }}
          >
            {attachments &&
              attachments.map(({ id, image }, index) => (
                <TextButton key={id} onClick={() => toggleCarousel(true, index)}>
                  {getImageName(image)}
                </TextButton>
              ))}
          </Box>
          <Dialog onClose={() => toggleCarousel(false)} open={carouselOpen}>
            <ImageCarousel
              closeCarousel={() => toggleCarousel(false)}
              bugId={id}
              images={attachments}
              startingPosition={carouselStartingPosition}
            />
          </Dialog>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <Button onClick={handleClose}>Close</Button>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button variant="contained" color="error" onClick={() => handleEvaluate(false)}>
            Mark as unfixed
          </Button>
          <Button variant="contained" onClick={() => handleEvaluate(true)}>
            Mark as fixed
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

BugDetailsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

BugDetailsModal.defaultProps = {
  open: false
};

export const ErrorDataCell = ({ errors }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleErrorShow = async (id) => {
    await dispatch(getBug({ errorId: id }));
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {errors?.map((error) => (
          <Button
            onClick={() => handleErrorShow(error.id)}
            key={error.id}
            color="error"
            sx={{ whiteSpace: 'nowrap' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'min-content 5.25rem',
                justifyItems: 'left',
                gap: '0.5rem'
              }}
            >
              {error.executed ? <CheckBox /> : <CheckBoxOutlineBlank />}
              {error.code}
            </Box>
          </Button>
        ))}
      </Box>
      <BugDetailsModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

ErrorDataCell.propTypes = {
  errors: PropTypes.array
};

ErrorDataCell.defaultProps = {
  errors: []
};

export default ErrorDataCell;
