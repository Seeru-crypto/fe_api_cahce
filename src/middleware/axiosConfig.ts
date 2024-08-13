import axios, {AxiosError, AxiosResponse} from 'axios';
import {storeRequest} from "./requestCache.ts";
import {InternalAxiosRequestConfig} from "axios";
import {execute} from "./AxiosMiddlewareSideEffects.ts";
import {TStore} from "../redux/store.tsx";

const TIMEOUT = 1 * 60 * 1000;
let store: TStore

const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: TIMEOUT
});

export const injectStore = (_store: TStore) => {
    store = _store
}

// REQUEST
const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    //implement caching
    if (!navigator.onLine) {
        // Handle offline logic
        storeRequest(config);
        return Promise.reject({message: 'Request stored offline'});
    }

    // Middleware side-effects
    execute(config, store)
    return config;
};

const onRequestError = (error: AxiosError) => {
    console.log("onRequestError")
    Promise.reject(error)
}

api.interceptors.request.use(onRequestSuccess, onRequestError);


// RESPONSE

function onResponseSuccess(response: AxiosResponse<any, any>) {
    return response
}

function onResponseError(error: AxiosError) {
    return Promise.reject(error);
}

api.interceptors.response.use(onResponseSuccess, onResponseError)

export default api;
