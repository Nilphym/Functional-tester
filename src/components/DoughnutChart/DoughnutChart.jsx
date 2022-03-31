import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';
import { lightGreen } from '@mui/material/colors';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
  lightGreen[100],
  lightGreen[200],
  lightGreen[300],
  lightGreen[400],
  lightGreen[500],
  lightGreen[600],
  lightGreen[700],
  lightGreen[800],
  lightGreen[900]
];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
  percent,
  payload,
  count,
  index,
  label
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {index === 0 && (
        <>
          <text x={cx} y={cy} dy={-3} textAnchor="middle">
            {count}
          </text>
          <text x={cx} y={cy} dy={18} textAnchor="middle">
            {label}
          </text>
        </>
      )}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export const DoughnutChart = ({ sx, name, label, data }) => {
  const count = data.reduce((previous, current) => previous + current.value, 0);

  const formatedData = data
    .filter((test) => test.value !== 0)
    .map((test) => ({
      ...test,
      name: test.name.length > 19 ? `${test.name.substring(0, 16)}...` : test.name
    }));

  return (
    <Box
      component={Paper}
      sx={{
        padding: '0.5rem 1.5rem 0',
        height: '20rem',
        width: '40rem',
        display: 'flex',
        alignItems: 'center',
        overflowY: 'hidden',
        ...sx
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center'
        }}
      >
        <Typography variant="overline">{name}</Typography>
        <ResponsiveContainer>
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              cy="45%"
              label={(props) => renderActiveShape({ ...props, count, label })}
              data={formatedData}
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {formatedData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DoughnutChart;

DoughnutChart.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

DoughnutChart.defaultProps = {
  sx: {}
};
