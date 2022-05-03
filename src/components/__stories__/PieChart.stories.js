import React from 'react';

import PieChart from '../PieChart/PieChart';

export default {
  title: 'Nilphym/PieChart',
  component: PieChart
};

const Template = (args) => <PieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Bugs by impact',
  label: 'Total bugs',
  data: [
    { name: 'High', value: 400 },
    { name: 'Medium', value: 300 },
    { name: 'Low', value: 300 }
  ]
};
