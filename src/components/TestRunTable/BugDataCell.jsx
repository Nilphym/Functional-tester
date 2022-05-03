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
import { evaluateBug } from '../../redux/store';
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

const BugDetailsModal = ({ bugs, openBugId, handleClose, open }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselStartingPosition, setCarouselStartingPosition] = useState(0);
  const dispatch = useDispatch();

  const handleEvaluate = (result) => {
    dispatch(evaluateBug({ bugId: openBugId, result }));
    handleClose();
  };

  const toggleCarousel = (state, index) => {
    setCarouselStartingPosition(index);
    setCarouselOpen(state);
  };

  const choosenBug = bugs.find((bug) => bug.id === openBugId);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Error details</DialogTitle>
      <DialogContent>
        {choosenBug && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography>
              <Bold>Name: </Bold>
              {choosenBug.name}
            </Typography>
            <Typography>
              <Bold>Description: </Bold>
              {choosenBug.description}
            </Typography>
            <Typography>
              <Bold>Functionality: </Bold>
              {choosenBug.functionality}
            </Typography>
            <Typography>
              <Bold>Type: </Bold>
              {choosenBug.type}
            </Typography>
            <Typography>
              <Bold>Attachments:</Bold>
            </Typography>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '2rem', gap: '0.5rem' }}
            >
              {choosenBug.attachments &&
                choosenBug.attachments.map(({ id, url }, index) => (
                  <TextButton key={id} onClick={() => toggleCarousel(true, index)}>
                    {getImageName(url)}
                  </TextButton>
                ))}
            </Box>
            <Dialog onClose={() => toggleCarousel(false)} open={carouselOpen}>
              <ImageCarousel
                closeCarousel={() => toggleCarousel(false)}
                bugId={choosenBug.id}
                images={choosenBug.attachments}
                startingPosition={carouselStartingPosition}
              />
            </Dialog>
          </Box>
        )}
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
  bugs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  openBugId: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

BugDetailsModal.defaultProps = {
  open: false,
  openBugId: null
};

export const BugDataCell = ({ bugs }) => {
  const [openBugId, setOpenBugId] = useState(null);
  const { userId } = useSelector((state) => state.auth.token);

  const handleErrorShow = (id) => {
    setOpenBugId(id);
  };

  const handleClose = () => {
    setOpenBugId(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {bugs?.map((bug) => (
          <Button
            onClick={() => handleErrorShow(bug.id)}
            key={bug.id}
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
              {bug.evaluatedBy.includes(userId) ? <CheckBox /> : <CheckBoxOutlineBlank />}
              {bug.code}
            </Box>
          </Button>
        ))}
      </Box>
      <BugDetailsModal
        bugs={bugs}
        openBugId={openBugId}
        open={!!openBugId}
        handleClose={handleClose}
      />
    </>
  );
};

BugDataCell.propTypes = {
  bugs: PropTypes.array.isRequired
};

export default BugDataCell;
