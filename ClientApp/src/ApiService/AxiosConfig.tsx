// axiosConfig.js

import axios from 'axios';

const defaultConfig = {
  baseURL: 'https://localhost:7264', 
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosConfig = axios.create(defaultConfig);

export default axiosConfig;
