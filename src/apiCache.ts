import axios from 'axios';
import {storeRequest} from "./requestCache.ts";

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

api.interceptors.request.use(async (config) => {
    if (!navigator.onLine) {
        // Handle offline logic
        storeRequest(config);
        return Promise.reject({ message: 'Request stored offline' });
    }
    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, (error) => {
  if (!navigator.onLine) {
    storeRequest(error.config);
  }
  return Promise.reject(error);
});

export default api;
