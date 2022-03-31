import React from 'react';

import TestRun from './TestRun';

export default {
  title: 'Nilphym/Test Run',
  component: TestRun
};

const Template = (args) => <TestRun {...args} />;

const preconditions = 'Some tables probably';
const expectedResult = 'User successfully registered';
const rows = [
  { id: 1, step: 'Enter the page', associatedBugs: ['b-1213112', 'b-1234121'] },
  { id: 2, step: 'Find big icon', testData: ['td-142482'] },
  {
    id: 3,
    step: 'Click big icon',
    associatedBugs: ['b-1213112'],
    controlPoint: 'A big gate to heaven will emerge in front of you.'
  },
  { id: 4, step: 'Throw salt behind your left arm', testData: ['td-142482', 'td-545212'] },
  {
    id: 5,
    step: "Say 'Oh holy angel, spare my soul'",
    controlPoint: 'An angel should spare your soul.'
  }
];

export const Default = Template.bind({});
Default.args = { preconditions, expectedResult, rows };
