import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      // Token Expired / Belum Login (401)
      if (status === 401) {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'; 
          alert("Section Expired, Please Relogin!.");
        }
      }

      // Kena Rate Limit (429)
      if (status === 429) {
        console.warn("Too many requests! Slow down.");
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;