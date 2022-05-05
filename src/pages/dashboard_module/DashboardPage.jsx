import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';

import { getRaport } from '../../redux/store';
import { PageContainer, Loader } from '../../components/common';
import {
  Statistic,
  PieChart,
  PercentageChart,
  DoughnutChart
} from '../../components/dashboard_module';

export const DashboardPage = () => {
  const { loading, raport } = useSelector((state) => state.raports);
  const smallMedia = useMediaQuery('(max-width: 1100px)');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRaport());
  }, []);

  return (
    <PageContainer header="Dashboard">
      <Loader loading={loading}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: smallMedia ? 'repeat(2, max-content)' : 'repeat(3, max-content)',
            gap: '2rem',
            justifyContent: 'center'
          }}
        >
          <Statistic name="Days from product start" number={raport.daysFromStart} icon="time" />
          <Statistic name="Testers" number={raport.testers} icon="person" />
          <Statistic name="Developers" number={raport.devs} icon="person" />
          <PieChart
            sx={{ gridRow: 'span 2' }}
            name="Bugs by impact"
            label="Total bugs"
            data={raport.bugsByImpact}
          />
          <PieChart
            sx={{ gridRow: 'span 2' }}
            name="Bugs by priority"
            label="Total bugs"
            data={raport.bugsByPriority}
          />
          <Statistic name="Test suites" number={raport.testSuites} icon="test" />
          <Statistic
            sx={smallMedia && { gridRow: 7, gridColumn: 2 }}
            name="Rejected bugs"
            number={raport.bugsRejected}
            icon="bug"
          />
          <DoughnutChart
            sx={{ gridColumn: 'span 2', gridRow: 'span 2' }}
            name="Test suites"
            label="Tests"
            data={raport.testSuitesByName}
          />
          <PercentageChart
            sx={{ gridRow: 'span 2' }}
            name="Bugs closed"
            completedLabel="Closed"
            all={raport.bugsAll}
            completed={raport.bugsFixed}
          />
        </Box>
      </Loader>
    </PageContainer>
  );
};

export default DashboardPage;
