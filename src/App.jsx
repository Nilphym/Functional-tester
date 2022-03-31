import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import { RequireAuth } from './providers';
import { Logout } from './containers';
import {
  LoginPanel,
  TestPlan,
  Test,
  RegisterPanel,
  ResetPasswordPanel,
  ForgotPasswordPanel,
  RegisterToProjectPanel,
  TestPlansView,
  InviteUserToProjectPanel,
  WelcomeUserToProjectPanel
} from './components';
import {
  NotFound,
  AssignedBugsPage,
  ActiveBugsPage,
  AllBugsPage,
  TestRunPage,
  RetestBugsPage,
  DashboardPage
} from './pages';
import DeleteUserPanel from './components/DeleteUserPanel/DeleteUserPanel';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPanel />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<RegisterPanel />} />
        <Route path="resetPassword" element={<ForgotPasswordPanel />} />
        <Route path="api/auth/:userId/:token" element={<ResetPasswordPanel />} />
        <Route path="inviteUser" element={<InviteUserToProjectPanel />} />
        <Route path="welcome/:username" element={<WelcomeUserToProjectPanel />} />
        <Route
          path="api/account/:role/:productIdEncoded/:emailEncoded"
          element={<RegisterToProjectPanel />}
        />
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="bugs" element={<AllBugsPage />} />
          <Route path="bugs/assigned" element={<AssignedBugsPage />} />
          <Route path="bugs/active" element={<ActiveBugsPage />} />
          <Route path="bugs/retest" element={<RetestBugsPage />} />
          <Route path="test/execution" element={<TestRunPage />} />
          <Route path="testPlans" element={<TestPlansView />} />
          <Route path="testPlan-e-:testPlanId" element={<TestPlan isEditable />} />
          <Route path="testPlan-:testPlanId" element={<TestPlan isEditable={false} />} />
          <Route path="testPlan-:testPlanId/test-e-:testId" element={<Test isEditable />} />
          <Route path="testPlan-:testPlanId/test-:testId" element={<Test isEditable={false} />} />
          <Route path="deleteUser" element={<DeleteUserPanel />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
