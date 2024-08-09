import axios, {AxiosError, AxiosResponse} from 'axios';
import {storeRequest} from "./requestCache.ts";
import {InternalAxiosRequestConfig} from "axios";
import {execute} from "./AxiosMiddlewareSideEffects.ts";

const TIMEOUT = 1 * 60 * 1000;
const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: TIMEOUT
});

// REQUEST
const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    //implement caching
    if (!navigator.onLine) {
        // Handle offline logic
        storeRequest(config);
        return Promise.reject({ message: 'Request stored offline' });
    }

    // Middleware side-effects
    execute(config)
    return config;
};

const onRequestError=(error:AxiosError) => {
    console.log("onRequestError")
    Promise.reject(error)
}

api.interceptors.request.use(onRequestSuccess, onRequestError);


// RESPONSE

function onResponseSuccess(response: AxiosResponse<any, any>) {
    return response
}

function onResponseError(error: AxiosError) {
    if (!navigator.onLine) {
        storeRequest(error.config);
    }
    return Promise.reject(error);
}

api.interceptors.response.use(onResponseSuccess, onResponseError)

export default api;
