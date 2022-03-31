import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/system';
import { Box, Paper, Typography } from '@mui/material';
import { Cell, RadialBarChart, PolarAngleAxis, RadialBar, ResponsiveContainer } from 'recharts';

const renderCustomLabel = ({ value, cx, cy, offset, fill, name }) => {
  return (
    <text
      style={{ transform: 'scale(0.7) translate(22%, 23%)' }}
      name={name}
      fill={fill}
      cx={cx}
      cy={cy}
      offset={offset}
      x={cx}
      y={cy}
      className="recharts-text recharts-label"
      textAnchor="middle"
    >
      <tspan x={cx} dy="0.355em">
        {`${value}%`}
      </tspan>
    </text>
  );
};

const Dot = styled(Box)({
  width: '0.5rem',
  height: '0.5rem',
  borderRadius: '50%',
  marginRight: '0.5rem',
  display: 'inline-block'
});

const Legend = ({ completed, all, completedLabel }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplate: '1fr 1fr / min-content 1fr',
        alignItems: 'center'
      }}
    >
      <Dot sx={{ backgroundColor: 'success.main' }} />
      <Typography sx={{ display: 'inline', color: 'text.secondary' }}>{completedLabel}</Typography>
      <Box />
      <Typography sx={{ grid: '', fontWeight: 'bold' }}>{completed}</Typography>
      <Box sx={{ gridColumn: 'span 2', height: '1rem' }} />
      <Dot sx={{ backgroundColor: 'info.main' }} />
      <Typography sx={{ display: 'inline', color: 'text.secondary' }}>All</Typography>
      <Box />
      <Typography sx={{ fontWeight: 'bold' }}>{all}</Typography>
    </Box>
  );
};

Legend.propTypes = {
  completed: PropTypes.number.isRequired,
  all: PropTypes.number.isRequired,
  completedLabel: PropTypes.string.isRequired
};

export const PercentageChart = ({ sx, name, all, completed, completedLabel }) => {
  const {
    palette: { secondary }
  } = useTheme();

  return (
    <Box
      component={Paper}
      sx={{
        ...sx,
        padding: '0.5rem 1.5rem 0',
        height: '20rem',
        width: '19rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'hidden'
      }}
    >
      <Box sx={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="overline">{name}</Typography>
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="40%"
            outerRadius="60%"
            data={[
              { value: completed && all ? Math.round((completed / all) * 100) : 0, fill: '#8884d8' }
            ]}
            startAngle={180}
            endAngle={0}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            style={{ transform: 'scale(2)' }}
            cy="60%"
          >
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor={secondary.dark} />
                <stop offset="100%" stopColor={secondary.light} />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar label={renderCustomLabel} background angleAxisId={0} dataKey="value">
              <Cell key="0" fill="url(#gradient)" />
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
      <Legend completed={completed} completedLabel={completedLabel} all={all} />
    </Box>
  );
};

export default PercentageChart;

PercentageChart.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string.isRequired,
  all: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  completedLabel: PropTypes.string.isRequired
};

PercentageChart.defaultProps = {
  sx: {}
};
