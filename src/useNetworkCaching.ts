import {useEffect} from "react";
import useGetNetworkStatus from "./useGetNetworkStatus.ts";
import {clearRequests, IRequestCachePayload, retrieveRequests} from "./requestCache.ts";
import api from "./apiCache.ts";

const useNetworkCaching = () => {
    const isOnline = useGetNetworkStatus();

    useEffect(() => {
        if (isOnline) {
            retryRequests()
        }
    }, [isOnline]);
}

function retryRequests() {
    const storedRequests:IRequestCachePayload[] = retrieveRequests();
    storedRequests.forEach(async (request) => {
        try {
            if (request != null) {
                api(request)
                const remainingRequests = storedRequests.filter(req => req !== request);
                localStorage.setItem('offlineRequests', JSON.stringify(remainingRequests));
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