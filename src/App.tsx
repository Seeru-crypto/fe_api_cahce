import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./apiCache.ts";
import {IPlate} from "./models/IPlate.ts";
import {getRandomPlate} from "./utils/getRandomPlate.ts";
import useGetNetworkStatus from "./useGetNetworkStatus.ts";
import useNetworkCaching from "./useNetworkCaching.ts";

function App() {
    const [plates, setPlates] = useState<IPlate[]>([])
    const isOnline = useGetNetworkStatus();
    useNetworkCaching();

    useEffect(() => {
        getPlates()
    }, []);

    function getInternetString() {
        if (isOnline) return "on"
        return "off"
    }

    async function getPlates() {
        const res = await api.get("/plates")
        setPlates(res.data)
    }

    async function savePlate() {
        const payload = getRandomPlate()
        await api.post("/plates", payload)
        getPlates()
    }

    async function deletePlate() {
        if (plates.length == 0) {
            await getPlates()
        }

        if (plates.length > 0) {
            const latestId = plates.pop().id
            await api.delete(`/plates/${latestId}`)
            getPlates()
        }
    }

    return (
        <>
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
            </div>

            <div className="card">
                <button onClick={() => getPlates()}>
                    GET
                </button>
                <button onClick={() => savePlate()}>
                    POST
                </button>
                <button onClick={() => deletePlate()}>
                    DELETE
                </button>
            </div>
            <a href="https://google.com" target="_blank">googl</a>

            <div className="plate-container">
                {plates.map(plate => {
                        return (
                            <div key={plate.id} className="plate">
                                <h2>{plate.string}-{plate.numbers}</h2>
                            </div>
                        )
                    }
                )
                }
            </div>
        </>
    )
}

export default App