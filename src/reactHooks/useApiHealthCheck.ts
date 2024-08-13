import {useEffect, useState} from "react";
import {TStore, useAppSelector} from "../redux/store.tsx";
import {getApiHealth} from "../redux/slices/appReducer.ts";
import {errorOption, infoOption, toastManager} from "../utils/toastManager.ts";
import {Id} from "react-toastify/dist/types";

const useApiHealthCheck = (store: TStore) => {
    const onlineTimer = 10 // in seconds
    const {isApiOnline} = useAppSelector(state => state.app)
    const [isInitialRender, setIsInitialRender] = useState(true)
    let toastId: Id = {};

    useEffect(() => {
        store.dispatch(getApiHealth())
        const id = setInterval(() => {
            store.dispatch(getApiHealth())
        }, onlineTimer * 1000)
        setIsInitialRender(false)
        return () => {
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        if (!isApiOnline) {
            toastId = toastManager.notify("API offline", errorOption)
        } else if (!isInitialRender && toastId.toString() != "") {
            toastManager.removeToast(toastId)
            toastId = {}
            toastManager.notify("API online", infoOption)
        }
    }, [isApiOnline])
}

export default useApiHealthCheck;