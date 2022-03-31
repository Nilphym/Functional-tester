import React from 'react';

import BugTable, { bugTableTypes } from './BugTable';

export default {
  title: 'Nilphym/Bug Table',
  component: BugTable
};

const Template = (args) => <BugTable {...args} />;

export const ToReview = Template.bind({});
ToReview.args = { type: bugTableTypes.toReview };

export const Active = Template.bind({});
Active.args = { type: bugTableTypes.active };

export const Assigned = Template.bind({});
Assigned.args = { type: bugTableTypes.assigned };
