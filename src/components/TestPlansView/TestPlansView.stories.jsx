import React from 'react';

import TestPlansView from './TestPlansView';

export default {
  title: 'Michal/TestPlansView',
  component: TestPlansView
};

const Template = (args) => <TestPlansView {...args} />;

export const Default = Template.bind({});
Default.args = {
  isEditable: true
};
