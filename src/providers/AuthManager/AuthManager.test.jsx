/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import AuthManager from './AuthManager';
import { TOKEN_KEY } from '../../config';

const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNzAxZDk3NGEtZjU5Zi00OWUzLWFiYjQtNTc3NTY3ZjViYzZlIiwibmFtZSI6IkpvaG4iLCJzdXJuYW1lIjoiTm93YWsiLCJwcm9kdWN0SWQiOiIxNzdjNDVhNi0zZDY0LTQ2Y2UtYjRkYS0wMTJhYjRhZWQxYzYiLCJwcm9kdWN0TmFtZSI6IkNsb3RoIHNob3AiLCJyb2xlIjoiVGVzdGVyIiwiZXhwIjoxMjQwNjkzNTE0LCJpc3MiOiJGdW50ZXN0IiwiYXVkIjoiRnVudGVzdCJ9.DPnlfZLAs-KmoLAgcOfURUJoEMyWHpz5Qf3jzITQ0VY';

describe('AuthManager', () => {
  it('should logout when token is expired', async () => {
    const TestComponent = () => {
      const navigate = useNavigate();
      return (
        <button
          data-testid="redirectButton"
          type="button"
          onClick={() => navigate('/otherRoute')}
        />
      );
    };

    localStorage.setItem(TOKEN_KEY, expiredToken);
    let tokenFromLocalStorage = localStorage.getItem(TOKEN_KEY);
    expect(tokenFromLocalStorage).toBe(expiredToken);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <AuthManager>
            <TestComponent />
          </AuthManager>
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('redirectButton'));
    });

    setTimeout(() => {
      tokenFromLocalStorage = localStorage.getItem(TOKEN_KEY);
      expect(tokenFromLocalStorage).toBe(null);
    });
  });
});
