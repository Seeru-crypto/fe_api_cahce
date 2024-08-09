import {InternalAxiosRequestConfig, Method} from "axios";

export interface IRequestCachePayload<D> {
    data?: D;
    method?: Method | string;
    url?: string
}

export const storeRequest = (request: InternalAxiosRequestConfig) => {
    const payload: IRequestCachePayload<never> = {
        method: request.method,
        url: request.url,
        data: request.data
    }
    console.log(`stored payload ${payload}`)

    const storageString = localStorage.getItem('offlineRequests')

    const existingRequests: IRequestCachePayload<never>[] = storageString ? JSON.parse(storageString) : []
    existingRequests.push(payload);
    localStorage.setItem('offlineRequests', JSON.stringify(existingRequests));
};

export const retrieveRequests = (): IRequestCachePayload<never>[] => {
    const storageString = localStorage.getItem('offlineRequests')

    return storageString ? JSON.parse(storageString) : []
};

export const clearRequests = () => {
    localStorage.removeItem('offlineRequests');
};
