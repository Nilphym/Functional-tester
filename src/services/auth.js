import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { API_URL, TOKEN_KEY } from '../config';

const authService = {
  getDecodedToken() {
    const token = this.getToken();
    return token ? jwtDecode(token) : undefined;
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  async login({ email, password }) {
    let token = null;
    try {
      const { data } = await axios.post(`${API_URL}Auth/login`, { email, password });
      token = data.token;
      localStorage.setItem(TOKEN_KEY, token);
    } catch (err) {
      console.log(err);
    }
    return jwtDecode(token);
  },
  async register({ username, email, password }) {
    const { data } = await axios.post(`${API_URL}signup`, { username, email, password });
    return data;
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export default authService;
