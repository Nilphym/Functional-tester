import React from 'react';

import Statistic from '../Statistic/Statistic';

export default {
  title: 'Nilphym/Statistic',
  component: Statistic
};

const Template = (args) => <Statistic {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Test Suites',
  number: 53,
  icon: 'bug'
};
