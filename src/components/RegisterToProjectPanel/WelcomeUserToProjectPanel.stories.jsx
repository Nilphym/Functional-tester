import React from 'react';

import WelcomeUserToProjectPanel from './WelcomeUserToProjectPanel';

export default {
  title: 'Common/WelcomeUserToProjectPanel',
  component: WelcomeUserToProjectPanel
};

const Template = (args) => <WelcomeUserToProjectPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    login: 'Genowefa.123@Project-X.pl',
    name: 'Genowefa'
  },
  projectName: 'Project-X'
};
