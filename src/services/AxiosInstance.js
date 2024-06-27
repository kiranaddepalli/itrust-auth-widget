import axios from 'axios';
import { API_GATEWAY } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_GATEWAY,
});

// Request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the anonymous token for all calls, except the url '/api/v1/anon/token'
    if(config.url !== '/api/v1/anon/token') {
      const token = await getAnonymousToken();
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getAnonymousToken = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/anon/token");
    // console.log('Response: ', response)
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}



export default axiosInstance;
