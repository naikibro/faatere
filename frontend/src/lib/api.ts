import axios, { AxiosError } from 'axios';
import { getToken, clearTokens } from './auth';

/**
 * Axios instance configured for the Faatere API
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - adds auth token to requests
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - handles authentication errors
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Don't redirect for login endpoint errors
    if (error.config?.url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
