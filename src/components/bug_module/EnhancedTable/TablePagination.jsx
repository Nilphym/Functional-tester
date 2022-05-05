import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreHoriz
} from '@mui/icons-material';

const PaginationButtonStyled = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ active, theme }) => ({
  width: '1.925rem',
  ...(active && {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    pointerEvents: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  })
}));

const DotsIcon = styled(MoreHoriz)({
  width: '1.925rem'
});

const PageNumeration = ({ onPageChange, pageCount, page, toggleAllRowsExpanded }) => {
  const maxPagesForSmallPagination = 7;
  const maxPageForPostDots = 3;
  const maxPagesInLongPagination = 5;

  const onNumberButtonClick = (page) => {
    toggleAllRowsExpanded(false);
    onPageChange(page);
  };

  const PaginationButton = ({ children }) => (
    <PaginationButtonStyled
      onClick={() => onNumberButtonClick(children - 1)}
      size="small"
      active={children - 1 === page}
    >
      {children}
    </PaginationButtonStyled>
  );

  PaginationButton.propTypes = { children: PropTypes.number.isRequired };

  let numerationButtons = null;

  if (pageCount < maxPagesForSmallPagination + 1) {
    numerationButtons = (
      <>
        {[...Array(pageCount).keys()].map((number) => (
          <PaginationButton key={number}>{number + 1}</PaginationButton>
        ))}
      </>
    );
  } else if (page <= maxPageForPostDots - 1) {
    numerationButtons = (
      <>
        {[...Array(maxPagesInLongPagination).keys()].map((number) => (
          <PaginationButton key={number}>{number + 1}</PaginationButton>
        ))}
        <DotsIcon />
        <PaginationButton>{pageCount}</PaginationButton>
      </>
    );
  } else if (page >= pageCount - maxPageForPostDots) {
    numerationButtons = (
      <>
        <PaginationButton>1</PaginationButton>
        <DotsIcon />
        {[...Array(maxPagesInLongPagination).keys()].map((number) => (
          <PaginationButton key={number}>
            {number + pageCount - maxPagesInLongPagination + 1}
          </PaginationButton>
        ))}
      </>
    );
  } else {
    numerationButtons = (
      <>
        <PaginationButton>1</PaginationButton>
        <DotsIcon />
        <PaginationButton>{page}</PaginationButton>
        <PaginationButton>{page + 1}</PaginationButton>
        <PaginationButton>{page + 2}</PaginationButton>
        <DotsIcon />
        <PaginationButton>{pageCount}</PaginationButton>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        gridTemplateColumns: `repeat(${
          pageCount < maxPagesForSmallPagination + 1 ? pageCount : maxPagesForSmallPagination
        }, 1fr)`
      }}
    >
      {numerationButtons}
    </Box>
  );
};

PageNumeration.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  toggleAllRowsExpanded: PropTypes.func.isRequired
};

const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  page,
  onPageChange,
  preGlobalFilteredRows,
  title,
  toggleAllRowsExpanded
}) => {
  const handleFirstPageButtonClick = () => {
    toggleAllRowsExpanded(false);
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    toggleAllRowsExpanded(false);
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    toggleAllRowsExpanded(false);
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    toggleAllRowsExpanded(false);
    onPageChange(Math.max(0, pageCount - 1));
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', placeItems: 'center' }}>
      <Box />
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={!canPreviousPage}>
          <FirstPage />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={!canPreviousPage}>
          <KeyboardArrowLeft />
        </IconButton>
        <PageNumeration
          onPageChange={onPageChange}
          pageCount={pageCount}
          page={page}
          toggleAllRowsExpanded={toggleAllRowsExpanded}
        />
        <IconButton onClick={handleNextButtonClick} disabled={!canNextPage}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={!canNextPage}>
          <LastPage />
        </IconButton>
      </Box>
      <Typography sx={{ justifySelf: 'end', paddingRight: '1rem' }}>
        {`${preGlobalFilteredRows.length} ${title.toLowerCase()}`}
      </Typography>
    </Box>
  );
};

TablePagination.propTypes = {
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  toggleAllRowsExpanded: PropTypes.func.isRequired
};

export default TablePagination;
