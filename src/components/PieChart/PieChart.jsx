import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';
import { lightGreen } from '@mui/material/colors';
import { PieChart as PieChartRecharts, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = [lightGreen[300], lightGreen[200], lightGreen[100]];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {name}
      </text>
      <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" dy={18}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

export const PieChart = ({ sx, name, label, data }) => {
  const count = data.reduce((previous, current) => previous + current.value, 0);

  return (
    <Box
      component={Paper}
      sx={{
        ...sx,
        padding: '0.5rem 1.5rem 0.7rem',
        height: '20rem',
        width: '19rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'hidden'
      }}
    >
      <Typography sx={{ alignSelf: 'flex-start' }} variant="overline">
        {name}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartRecharts width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((item, index) => (
              <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChartRecharts>
      </ResponsiveContainer>
      <Typography variant="overline">{`${label} ${count}`}</Typography>
    </Box>
  );
};

export default PieChart;

PieChart.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

PieChart.defaultProps = {
  sx: {}
};
