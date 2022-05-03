import server from '../server';
import { TOKEN_KEY } from '../../config';

jest.mock('axios');

const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNzAxZDk3NGEtZjU5Zi00OWUzLWFiYjQtNTc3NTY3ZjViYzZlIiwibmFtZSI6IkpvaG4iLCJzdXJuYW1lIjoiTm93YWsiLCJwcm9kdWN0SWQiOiIxNzdjNDVhNi0zZDY0LTQ2Y2UtYjRkYS0wMTJhYjRhZWQxYzYiLCJwcm9kdWN0TmFtZSI6IkNsb3RoIHNob3AiLCJyb2xlIjoiVGVzdGVyIiwiZXhwIjo1NjQwNjkzNTE0LCJpc3MiOiJGdW50ZXN0IiwiYXVkIjoiRnVudGVzdCJ9.Nrfdk4IN11ieqV4-zWRBftBQAV67Ls_fJT1fRz3QZzM';

describe('server', () => {
  describe('get', () => {
    it('should correctly pass url and auth header', async () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      const testURL = 'https://google.com';

      const instance = {
        get(url, config) {
          return { data: { url, config } };
        }
      };
      const { url, config } = await server(instance).get({ url: testURL });

      expect(url).toBe(testURL);
      expect(config).toStrictEqual({
        headers: { Authorization: `Bearer ${testToken}` }
      });
    });
  });

  describe('post', () => {
    it('should correctly pass url, data and auth header', async () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      const testURL = 'https://google.com';
      const testData = { valid: true };

      const instance = {
        post(url, data, config) {
          return { data: { url, data, config } };
        }
      };
      const { url, data, config } = await server(instance).post({ url: testURL, data: testData });

      expect(url).toBe(testURL);
      expect(data).toStrictEqual(testData);
      expect(config).toStrictEqual({
        headers: { Authorization: `Bearer ${testToken}` }
      });
    });
  });

  describe('put', () => {
    it('should correctly pass url, data and auth header', async () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      const testURL = 'https://google.com';
      const testData = { valid: true };

      const instance = {
        put(url, data, config) {
          return { data: { url, data, config } };
        }
      };
      const { url, data, config } = await server(instance).put({ url: testURL, data: testData });

      expect(url).toBe(testURL);
      expect(data).toStrictEqual(testData);
      expect(config).toStrictEqual({
        headers: { Authorization: `Bearer ${testToken}` }
      });
    });
  });

  describe('delete', () => {
    it('should correctly pass url and auth header', async () => {
      localStorage.setItem(TOKEN_KEY, testToken);
      const testURL = 'https://google.com';

      const instance = {
        delete(url, config) {
          return { data: { url, config } };
        }
      };
      const { url, config } = await server(instance).delete({ url: testURL });

      expect(url).toBe(testURL);
      expect(config).toStrictEqual({
        headers: { Authorization: `Bearer ${testToken}` }
      });
    });
  });
});
