import React from 'react';

import LoginPanel from './LoginPanel';

export default {
  title: 'Common/LoginPanel',
  component: LoginPanel
};

const Template = (args) => <LoginPanel {...args} />;

export const Default = Template.bind({});
Default.args = {};
