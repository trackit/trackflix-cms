import axios from 'axios';
import { useFetchClient } from '@strapi/helper-plugin';

const instance = axios.create({
  baseURL: "http://localhost:1337/api",
});

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${auth.getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.message)
  }
);

export default instance;
