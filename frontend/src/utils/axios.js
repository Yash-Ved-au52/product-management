import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://product-management-api-bc0d.onrender.com/api', // Your backend URL
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default instance;
