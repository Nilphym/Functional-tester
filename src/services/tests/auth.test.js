import axios from 'axios';
import jwtDecode from 'jwt-decode';

import authService from '../auth';
import { TOKEN_KEY } from '../../config';

jest.mock('axios');

const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNzAxZDk3NGEtZjU5Zi00OWUzLWFiYjQtNTc3NTY3ZjViYzZlIiwibmFtZSI6IkpvaG4iLCJzdXJuYW1lIjoiTm93YWsiLCJwcm9kdWN0SWQiOiIxNzdjNDVhNi0zZDY0LTQ2Y2UtYjRkYS0wMTJhYjRhZWQxYzYiLCJwcm9kdWN0TmFtZSI6IkNsb3RoIHNob3AiLCJyb2xlIjoiVGVzdGVyIiwiZXhwIjo1NjQwNjkzNTE0LCJpc3MiOiJGdW50ZXN0IiwiYXVkIjoiRnVudGVzdCJ9.Nrfdk4IN11ieqV4-zWRBftBQAV67Ls_fJT1fRz3QZzM';

describe('authService', () => {
  describe('login', () => {
    it('should save token in localStorage', async () => {
      axios.post.mockResolvedValueOnce({ data: { token: testToken } });

      await authService.login({});
      const savedToken = localStorage.getItem(TOKEN_KEY);

      expect(savedToken).toBe(testToken);
    });

    it('should return decoded token', async () => {
      axios.post.mockResolvedValueOnce({ data: { token: testToken } });

      const decodedToken = await authService.login({});

      expect(decodedToken).toStrictEqual(jwtDecode(testToken));
    });
  });

  describe('getDecodedToken', () => {
    it('should decode token saved in localStorage', () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      const decodedToken = authService.getDecodedToken();

      expect(decodedToken).toStrictEqual(jwtDecode(testToken));
    });

    it('should return undefined if there is no token in localStorage', () => {
      localStorage.removeItem(TOKEN_KEY);
      const decodedToken = authService.getDecodedToken();

      expect(decodedToken).toBe(undefined);
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      authService.logout();
      const savedToken = localStorage.getItem(TOKEN_KEY);

      expect(savedToken).toBe(null);
    });
  });

  describe('getAuthHeader', () => {
    it('should return valid axios header if token is in localStorage', () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      const header = authService.getAuthHeader();

      expect(header).toStrictEqual({ Authorization: `Bearer ${testToken}` });
    });

    it('should return empty object if there is no token in localStorage', () => {
      localStorage.removeItem(TOKEN_KEY);
      const header = authService.getAuthHeader();

      expect(header).toStrictEqual({});
    });
  });
});
