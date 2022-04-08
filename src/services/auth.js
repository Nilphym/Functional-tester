import jwtDecode from 'jwt-decode';

import server from './server';
import { TOKEN_KEY } from '../config';

const roles = {
  projectManager: 'projectManager',
  developer: 'developer',
  tester: 'tester'
};

const authService = {
  getDecodedToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? jwtDecode(token) : null;
  },

  async login({ email, password }) {
    const token = await server.post({ url: 'users/login', data: { email, password } });
    localStorage.setItem(TOKEN_KEY, token);
    return jwtDecode(token);
  },

  async registerProject({ projectName, name, surname, email, password }) {
    const project = await server.post({
      url: 'projects',
      data: {
        name: projectName
      }
    });

    const user = await server.post({
      url: 'users',
      data: {
        projectId: project.id,
        name,
        surname,
        email,
        password,
        role: roles.projectManager
      }
    });

    return { project, user };
  },

  async registerUser({ projectId, name, surname, email, password, role }) {
    const user = await server().post({
      url: 'users',
      data: {
        projectId,
        name,
        surname,
        email,
        password,
        role
      }
    });
    return user;
  },

  async inviteUser({ projectId, email, role }) {
    const user = await server().post({
      url: 'users/invite',
      data: {
        projectId,
        email,
        role
      }
    });
    return user;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async getUsers() {
    const users = await server.get({ url: 'users' });
    return users;
  },

  async forgotPassword({ id }) {
    const response = await server.post({
      url: `users/${id}/forgot_password`
    });
    return response;
  },

  async updatePassword({ id, password, resetToken }) {
    await server.put({
      url: `users/${id}/password`,
      data: {
        id,
        password,
        resetToken
      }
    });
  },

  async deleteUser({ id }) {
    await server.delete({ url: `users/${id}` });
  }
};

export default authService;
