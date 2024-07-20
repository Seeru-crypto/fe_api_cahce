import {InternalAxiosRequestConfig} from "axios/index";

export interface IRequestCachePayload {
    method: any,
    url: any,
    data: any,
}

export const storeRequest = (request: InternalAxiosRequestConfig) => {
    //requestQueue.push({ method, url, data, config });

    const payload:IRequestCachePayload = {
        method: request.method,
        url: request.url,
        data: request.data
    }

    const storedRequests = JSON.parse(localStorage.getItem('offlineRequests')) || [];
    storedRequests.push(payload);
    localStorage.setItem('offlineRequests', JSON.stringify(storedRequests));
};

export const retrieveRequests = () => {
    return JSON.parse(localStorage.getItem('offlineRequests')) || [];
};

export const clearRequests = () => {
    console.log('clearing all requests')
    localStorage.removeItem('offlineRequests');
};
