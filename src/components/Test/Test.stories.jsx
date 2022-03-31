import React from 'react';

import Test from './Test';

export default {
  title: 'Michal/Test',
  component: Test
};

const Template = (args) => <Test {...args} />;

export const Default = Template.bind({});
Default.args = {
  isEditable: true
};
