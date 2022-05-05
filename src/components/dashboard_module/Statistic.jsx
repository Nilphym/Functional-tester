import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';
import { BugReport, FormatListBulleted, Person, AccessTime } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const statisticIcons = {
  bug: BugReport,
  time: AccessTime,
  test: FormatListBulleted,
  person: Person
};

export const Statistic = ({ sx, name, number, icon }) => {
  const Icon = statisticIcons[icon];

  return (
    <Box
      component={Paper}
      sx={{
        ...sx,
        height: '9rem',
        width: '19rem',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <Box
        sx={{
          backgroundColor: green[100],
          borderRadius: '50%',
          width: '3.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon sx={{ color: green[900] }} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>{number}</Typography>
        <Typography sx={{ color: 'text.disabled' }}>{name}</Typography>
      </Box>
    </Box>
  );
};

export default Statistic;

Statistic.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  icon: PropTypes.oneOf(Object.keys(statisticIcons)).isRequired
};

Statistic.defaultProps = {
  sx: {}
};
