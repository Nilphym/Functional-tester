import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useMediaQuery, CircularProgress } from '@mui/material';

import { Statistic, PieChart, PercentageChart, DoughnutChart } from '../../components';
import { getRaport } from '../../redux/store';

export const Dashboard = () => {
  const { loading, data: raportData } = useSelector((state) => state.raports);
  const smallMedia = useMediaQuery('(max-width: 1100px)');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRaport());
  }, []);

  return loading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: smallMedia ? 'repeat(2, max-content)' : 'repeat(3, max-content)',
        gap: '2rem',
        justifyContent: 'center'
      }}
    >
      <Statistic name="Days from product start" number={raportData.daysFromStart} icon="time" />
      <Statistic name="Testers" number={raportData.testersNumber} icon="person" />
      <Statistic name="Developers" number={raportData.devsNumber} icon="person" />
      <PieChart
        sx={{ gridRow: 'span 2' }}
        name="Bugs by impact"
        label="Total bugs"
        data={raportData.bugsByImpact}
      />
      <PieChart
        sx={{ gridRow: 'span 2' }}
        name="Bugs by priority"
        label="Total bugs"
        data={raportData.bugsByPriority}
      />
      <Statistic name="Test suites" number={raportData.testSuitesNumber} icon="test" />
      <Statistic
        sx={smallMedia ? { gridRow: 7, gridColumn: 2 } : {}}
        name="Rejected bugs"
        number={raportData.bugsRejected}
        icon="bug"
      />
      <DoughnutChart
        sx={{ gridColumn: 'span 2', gridRow: 'span 2' }}
        name="Test suites"
        label="Tests"
        data={raportData.testSuitesByName}
      />
      <PercentageChart
        sx={{ gridRow: 'span 2' }}
        name="Bugs closed"
        completedLabel="Closed"
        all={raportData.bugsAll}
        completed={raportData.bugsFixed}
      />
    </Box>
  );
};

export default Dashboard;
