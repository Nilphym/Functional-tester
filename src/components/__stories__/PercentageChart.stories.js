import React from 'react';

import PercentageChart from '../PercentageChart/PercentageChart';

export default {
  title: 'Nilphym/PercentageChart',
  component: PercentageChart
};

const Template = (args) => <PercentageChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Bugs fixed',
  completedLabel: 'Fixed',
  value: 43,
  all: 54,
  completed: 13
};
