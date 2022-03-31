import React from 'react';

import TestCase from './TestCase';

export default {
  title: 'Michal/TestCase',
  component: TestCase
};

const Template = (args) => <TestCase {...args} />;

export const Default = Template.bind({});
Default.args = {
  testPlanName: 'TestPlan1',
  testName: 'Test1',
  testCaseName: 'TestCase1',
  isEditable: true
};
