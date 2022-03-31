import React from 'react';

import RegisterPanel from './RegisterPanel';

export default {
  title: 'Common/RegisterPanel',
  component: RegisterPanel
};

const Template = (args) => <RegisterPanel {...args} />;

export const Default = Template.bind({});
Default.args = {};
