import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://menumap.onrender.com',  
  baseURL: 'http://13.232.188.31:3000',  
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
