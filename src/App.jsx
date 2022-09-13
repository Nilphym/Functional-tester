import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import { RequireAuth } from './providers';
import {
  DeleteUserPage,
  InvitePage,
  LoginPage,
  LogoutPage,
  RegisterFromInvitationPage,
  RegisterPage
} from './pages/auth_module';
import { BugListPage } from './pages/bug_module';
import { DashboardPage } from './pages/dashboard_module';
import { NotFound } from './pages/error_module';
import { TestRunPage, TestPlanPage, TestPlanListPage } from './pages/test_module';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />

        <Route path="register">
          <Route index element={<RegisterPage />} />
          <Route path="user/:invitationId" element={<RegisterFromInvitationPage />} />
        </Route>

        {/* <Route path="reset_password">
          <Route index element={<ForgotPasswordPanel />} />
          <Route path=":userId/:token" element={<ResetPasswordPanel />} />
        </Route> */}

        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="test_plans">
            <Route index element={<TestPlanListPage />} />
            <Route path=":id/:name" element={<TestPlanPage />} />
          </Route>
          <Route path="test_execution/:origin/:id" element={<TestRunPage />} />

          <Route path="bugs/:type" element={<BugListPage />} />

          <Route path="invite_user" element={<InvitePage />} />
          <Route path="delete_user" element={<DeleteUserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
