// axiosConfig.js

import axios from 'axios';

const defaultConfig = {
  baseURL: 'https://localhost:7264', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(defaultConfig);

export default axiosInstance;
