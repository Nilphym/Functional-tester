import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { BugTable, bugTableTypes } from '../../components/bug_module';

export const BugListPage = () => {
  const { type } = useParams();

  return bugTableTypes.includes(type) ? <BugTable type={type} /> : <Navigate to="/dashboard" />;
};
