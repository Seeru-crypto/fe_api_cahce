import {useEffect, useState} from "react";

const useGetNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true)
    const onlineTimer = 3 // in seconds

    useEffect(() => {
        const id = setInterval(() => setIsOnline(navigator.onLine), onlineTimer * 1000)
        return () => {
            clearInterval(id);
        };
    }, []);

    return isOnline;
};

export default useGetNetworkStatus;
