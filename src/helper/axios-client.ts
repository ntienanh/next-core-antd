import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  responseType: 'json',
  responseEncoding: 'utf8',
  headers: {
    'Content-Type': 'application/json',
  },
});

const accessTokenName = process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME;
const refreshTokenName = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME;

// Add a request interceptor to include the cookie in the headers
axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },

  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async response => {
    return response;
  },

  async (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default axiosInstance;
