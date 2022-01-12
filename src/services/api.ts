import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.31.6.136:3333',
});

export default api;
