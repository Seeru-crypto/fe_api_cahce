import {useEffect} from "react";
import useGetNetworkStatus from "./useGetNetworkStatus.ts";
import {clearRequests, IRequestCachePayload, retrieveRequests} from "../middleware/requestCache.ts";
import api from "../middleware/axiosConfig.ts";

const useLocalCaching = () => {
    const isOnline = useGetNetworkStatus();

    useEffect(() => {
        if (isOnline) {
            retryRequests()
        }
    }, [isOnline]);
}

function retryRequests() {
    const storedRequests:IRequestCachePayload<never>[] = retrieveRequests();
    storedRequests.forEach(async (request) => {
        try {
            if (request != null) {
                api(request)
                const remainingRequests = storedRequests.filter(req => req !== request);
                localStorage.setItem('offlineRequests', JSON.stringify(remainingRequests));
            }
            else {
                console.error('request is null')
            }
        } catch (error) {
            console.error('Retry failed:', error);
        }
    });
    clearRequests(); // Clear all requests once they have been retried
}

export default useLocalCaching;