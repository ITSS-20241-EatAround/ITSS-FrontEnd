import axios from 'axios';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from './localtoken';

const axiosInstance = axios.create({
  baseURL: process.env.API_DEV_URL || "http://enmutsubi-kami.myddns.me:7200/api/v1" /*"http://localhost:7200/api/v1"*/
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        removeTokenFromLocalStorage();
        
      }
    }  
    return Promise.reject(error);
  }
);

export default axiosInstance;
