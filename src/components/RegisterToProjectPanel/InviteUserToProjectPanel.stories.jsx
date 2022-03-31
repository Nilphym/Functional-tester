import React from 'react';

import InviteUserToProjectPanel from './InviteUserToProjectPanel';

export default {
  title: 'Common/InviteUserToProjectPanel',
  component: InviteUserToProjectPanel
};

const Template = (args) => <InviteUserToProjectPanel {...args} />;

export const Default = Template.bind({});
Default.args = {};
