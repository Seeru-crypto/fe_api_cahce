import {useEffect} from "react";
import useGetNetworkStatus from "./useGetNetworkStatus.ts";
import {clearRequests, retrieveRequests} from "./requestCache.ts";
import api from "./apiCache.ts";

const useNetworkCaching = () => {
    const isOnline = useGetNetworkStatus();

    useEffect(() => {
        if (isOnline) {
            retryRequests()
        }
    }, [isOnline]);
}

async function retryRequests() {
    const storedRequests = retrieveRequests();
    storedRequests.forEach(async (request) => {
        console.log({request})
        try {
            if (request != null) {
                await api(request);
                // Remove successful request from storage
                // const remainingRequests = storedRequests.filter(req => req !== request);
                // localStorage.setItem('offlineRequests', JSON.stringify(remainingRequests));
            }
            else {
                console.log('request is null')
            }
        } catch (error) {
            console.error('Retry failed:', error);
        }
    });
    clearRequests(); // Clear all requests once they have been retried

}

export default useNetworkCaching;