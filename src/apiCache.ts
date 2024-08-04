import axios from 'axios';
import {storeRequest} from "./requestCache.ts";

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

api.interceptors.request.use(async (config) => {
    console.log("request")
    if (!navigator.onLine) {
        // Handle offline logic
        storeRequest(config);
        return Promise.reject({ message: 'Request stored offline' });
    }

    if (config.method === 'post' && config.url === '/plates') {
        try {
            // Execute GET request
            await axios.get('/plates');
        } catch (error) {
            console.error('Error executing GET /plates:', error);
        }
    }

    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, (error) => {
    console.log("response")
    if (!navigator.onLine) {
    storeRequest(error.config);
  }
  return Promise.reject(error);
});

export default api;
