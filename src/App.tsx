import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getRandomPlate} from "./utils/getRandomPlate.ts";
import useGetNetworkStatus from "./reactHooks/useGetNetworkStatus.ts";
import useLocalCaching from "./reactHooks/useLocalCaching.ts";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store, useAppDispatch, useAppSelector} from "./redux/store.tsx";
import {deletePlate, getPlates, savePlate} from "./redux/slices/plateReducer.ts";
import {errorOption, toastManager} from "./toastManager.ts";
import {Id} from "react-toastify/dist/types";
import useApiHealthCheck from "./reactHooks/useApiHealthCheck.ts";

function App() {
    const [parent] = useAutoAnimate(/* optional config */)
    const dispatch = useAppDispatch();
    const {plates} = useAppSelector(state => state.plates)
    const [toastId, setToastId] = useState<Id>()
    const isOnline = useGetNetworkStatus();
    useLocalCaching();
    useApiHealthCheck(store)

    useEffect(() => {
        dispatch(getPlates())
    }, []);

    useEffect(() => {
        const message = "network is down"
        if (!isOnline) {
            setToastId(toastManager.notify(message,errorOption))
            // add error message
        }
        else if (isOnline && toastId !== undefined) {
            toastManager.removeToast(toastId)
            // remove error message
        }
    }, [isOnline])

    function getInternetString() {
        if (isOnline) return "on"
        return "off"
    }

    function saveEntity() {
        const payload = getRandomPlate()
        dispatch(savePlate(payload))
    }

    function getEntity() {
        dispatch(getPlates())
    }

    function deleteEntity() {
        if (plates.length == 0) {
            console.error("no plates found")
            return;
        }

        const latestId = plates[plates.length - 1].id
        if (latestId !== undefined) {
            dispatch(deletePlate(latestId));
        }
    }

    return (
        <div>
            <ToastContainer/>
            <div>
                <a target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <h2>Internet is {getInternetString()}</h2>

            <div className="card">
                <button onClick={() => getEntity()}>
                    GET
                </button>
                <button onClick={() => saveEntity()}>
                    POST
                </button>
                <button onClick={() => deleteEntity()}>
                    DELETE
                </button>
            </div>
            <ul ref={parent} className="plate-container">
                {plates.map(plate => {
                        return (
                            <li key={plate.id} className="plate">
                                <h2>{plate.letters}-{plate.plateNumbers}</h2>
                            </li>
                        )
                    }
                )
                }
            </ul>
        </div>
    )
}

export default App