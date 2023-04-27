import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.github.com/repos/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
