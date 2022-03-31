import axios from 'axios';

import authService from './auth';
import { API_URL, IMAGE_API_URL } from '../config';

const instance = axios.create({ baseURL: API_URL });

const server = (axiosInstance = instance) => ({
  async get({ url }) {
    const config = {
      headers: {
        ...authService.getAuthHeader()
      }
    };
    const { data: fetchedData } = await axiosInstance.get(url, config);
    return fetchedData;
  },

  async post({ url, data }) {
    const config = {
      headers: {
        ...authService.getAuthHeader()
      }
    };
    const { data: fetchedData } = await axiosInstance.post(url, data, config);
    return fetchedData;
  },

  async put({ url, data }) {
    const config = {
      headers: {
        ...authService.getAuthHeader()
      }
    };
    const { data: fetchedData } = await axiosInstance.put(url, data, config);
    return fetchedData;
  },

  async delete({ url }) {
    const config = {
      headers: {
        ...authService.getAuthHeader()
      }
    };
    const { data: fetchedData } = await axiosInstance.delete(url, config);
    return fetchedData;
  },

  async postImage({ base64image, imageName }) {
    const formData = new FormData();
    formData.append('image', base64image);
    formData.append('name', imageName);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    const {
      data: {
        data: {
          image: { url }
        }
      }
    } = await axios.post(IMAGE_API_URL, formData, config);

    return url;
  }
});

export default server;
