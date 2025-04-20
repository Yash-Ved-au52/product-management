import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Your backend URL
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default instance;
