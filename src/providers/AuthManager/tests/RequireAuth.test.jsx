import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import AuthManager from '../AuthManager';
import RequireAuth from '../RequireAuth';

describe('RequireAuth', () => {
  it('should redirect to login page when token is expired', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return <span data-testid="pathname">{pathname}</span>;
    };

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <AuthManager>
                  <RequireAuth>
                    <TestComponent />
                  </RequireAuth>
                </AuthManager>
              }
            />
            <Route path="/login" element={<TestComponent />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('pathname').textContent).toBe('/login');
  });
});
