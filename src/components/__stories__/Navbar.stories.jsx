import React from 'react';

import Navbar from '../Navbar/Navbar';

export default {
  title: 'Common/Navbar',
  component: Navbar
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    { icon: 'dashboard', text: 'Dashboard', destination: 'dashboard' },
    {
      icon: 'bugs',
      name: 'Bugs',
      links: [
        { text: 'My bugs', destination: 'my-bugs' },
        { text: 'Bugs to fix', destination: 'bugs-to-fix' }
      ]
    },
    { icon: 'tests', text: 'Tests', destination: 'tests' },
    { icon: 'logout', text: 'Logout', destination: 'logout' }
  ],
  profile: { name: 'John Snow' }
};
