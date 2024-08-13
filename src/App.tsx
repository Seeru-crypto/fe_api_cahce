import {useEffect, useState} from 'react'
import './App.css'
import useGetNetworkStatus from "./reactHooks/useGetNetworkStatus.ts";
import useLocalCaching from "./reactHooks/useLocalCaching.ts";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store} from "./redux/store.tsx";
import {errorOption, toastManager} from "./utils/toastManager.ts";
import {Id} from "react-toastify/dist/types";
import useApiHealthCheck from "./reactHooks/useApiHealthCheck.ts";
import ButtonGroup from "./components/ButtonGrp/ButtonGroup.tsx";
import PlateList from "./components/PlateList/PlateList.tsx";

function App() {
    const [toastId, setToastId] = useState<Id>()
    const isOnline = useGetNetworkStatus();
    useLocalCaching();
    useApiHealthCheck(store)


    useEffect(() => {
        const message = "network is down"
        if (!isOnline) {
            setToastId(toastManager.notify(message, errorOption))
            // add error message
        } else if (isOnline && toastId !== undefined) {
            toastManager.removeToast(toastId)
            // remove error message
        }
    }, [isOnline])

    function getInternetString() {
        if (isOnline) return "on"
        return "off"
    }

    return (
        <div className={"container"}>
            <ToastContainer/>
            <div className={"button-container"}>
                <ButtonGroup className={"buttons"}/>
            </div>

            <div className={"content"}>
                <h1>Vite + React</h1>
                <h2>Internet is {getInternetString()}</h2>
                <PlateList />

            </div>

        </div>
    )
}

export default App