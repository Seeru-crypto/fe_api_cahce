import {useEffect, useState} from "react";
import {TStore, useAppSelector} from "../redux/store.tsx";
import {getApiHealth} from "../redux/slices/appReducer.ts";
import {errorOption, infoOption, toastManager} from "../toastManager.ts";
import {Id} from "react-toastify/dist/types";

const useApiHealthCheck = (store: TStore) => {
    const onlineTimer = 10 // in seconds
    const {isApiOnline} = useAppSelector(state => state.app)
    const [isInitialRender, setIsInitialRender] = useState(true)
    let test: Id = {};

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
            test = toastManager.notify("API offline", errorOption)
        } else if (!isInitialRender && test.toString() != "") {
            toastManager.removeToast(test)
            test = {}
            toastManager.notify("API online", infoOption)
        }
    }, [isApiOnline])
}

export default useApiHealthCheck;