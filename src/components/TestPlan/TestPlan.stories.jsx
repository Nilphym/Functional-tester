import React from 'react';

import TestPlan from './TestPlan';

export default {
  title: 'Michal/TestPlan',
  component: TestPlan
};

const Template = (args) => <TestPlan {...args} />;

export const Default = Template.bind({});
Default.args = {
  isEditable: true
};
