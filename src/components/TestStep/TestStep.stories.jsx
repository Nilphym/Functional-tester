import React from 'react';

import TestStep from './TestStep';

export default {
  title: 'Michal/TestStep',
  component: TestStep
};

const Template = (args) => <TestStep {...args} />;

export const Default = Template.bind({});
Default.args = {
  testStepId: 'Ts1',
  isEditable: true
};
