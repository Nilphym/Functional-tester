import React from 'react';

import DoughnutChart from '../DoughnutChart/DoughnutChart';

export default {
  title: 'Nilphym/DoughnutChart',
  component: DoughnutChart
};

const Template = (args) => <DoughnutChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Test suites',
  label: 'Tests',
  data: [
    { name: 'High', value: 400 },
    { name: 'Medium', value: 300 },
    { name: 'Low', value: 300 },
    { name: 'Mega', value: 200 }
  ]
};
