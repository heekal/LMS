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

      // 401: Unauthorized
      if (status === 401) {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
          // Ganti alert pake toast biar elegan
          alert("Session Expired, Please Relogin!");
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;