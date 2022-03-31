import React from 'react';

import TestProcedure from './TestProcedure';

export default {
  title: 'Michal/TestProcedure',
  component: TestProcedure
};

const Template = (args) => <TestProcedure {...args} />;

export const Default = Template.bind({});
Default.args = {
  testPlanName: 'TestPlan1',
  testName: 'Test1',
  testProcedureName: 'TestProcedure1',
  isEditable: true
};
