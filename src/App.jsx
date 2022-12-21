import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import { RequireAuth } from './providers';
import { Logout } from './containers';
import { ResetPasswordPanel, ForgotPasswordPanel } from './components';
import {
  LoginPage,
  NotFound,
  AssignedBugsPage,
  ActiveBugsPage,
  AllBugsPage,
  TestRunPage,
  RetestBugsPage,
  DashboardPage,
  TestPlanPage,
  TestPlanListPage,
  RegisterPage,
  DeleteUserPage,
  InvitePage,
  RegisterFromInvitationPage,
  HomePage
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<Logout />} />

        <Route path="register">
          <Route index element={<RegisterPage />} />
          <Route path="user/:invitation" element={<RegisterFromInvitationPage />} />
        </Route>

        <Route path="reset_password">
          <Route index element={<ForgotPasswordPanel />} />
          <Route path=":userId/:token" element={<ResetPasswordPanel />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="test_plans">
            <Route index element={<TestPlanListPage />} />
            <Route path=":id/:name" element={<TestPlanPage />} />
          </Route>
          <Route path="test_execution/:origin/:id" element={<TestRunPage />} />

          <Route path="bugs">
            <Route index element={<AllBugsPage />} />
            <Route path="assigned" element={<AssignedBugsPage />} />
            <Route path="active" element={<ActiveBugsPage />} />
            <Route path="retest" element={<RetestBugsPage />} />
          </Route>

          <Route path="invite_user" element={<InvitePage />} />
          <Route path="delete_user" element={<DeleteUserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
