import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://menumap.onrender.com',  
  // baseURL: 'https://menumap.fr.to',  
  baseURL:'http://localhost:3000',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
