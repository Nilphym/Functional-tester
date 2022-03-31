import React from 'react';

import EditableTable from './EditableTable';

export default {
  title: 'Michal/EditableTable',
  component: EditableTable
};

const Template = (args) => <EditableTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    tableName: 'Table 1',
    RowName1: '',
    Data1: ['c', '1', '2', 'b', '3', 'c'],
    RowName2: 'Ble ble',
    Data2: ['x', 'y', 'z', 't', 'r', 'w'],
    RowName3: 'Tse Tse',
    Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
  },
  parentComp: 'testStep',
  deleteTable: () => {},
  testStepId: 'Ts1',
  disabled: false
};
