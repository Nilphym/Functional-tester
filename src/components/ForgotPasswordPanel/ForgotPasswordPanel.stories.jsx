import React from 'react';

import ForgotPasswordPanel from './ForgotPasswordPanel';

export default {
  title: 'Michal/ForgotPasswordPanel',
  component: ForgotPasswordPanel
};

const Template = (args) => <ForgotPasswordPanel {...args} />;

export const Default = Template.bind({});
Default.args = {};
