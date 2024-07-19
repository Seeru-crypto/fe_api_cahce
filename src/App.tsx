import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./apiCache.ts";
import {IPlate} from "./models/IPlate.ts";
import {getRandomPlate} from "./utils/getRandomPlate.ts";

function App() {
    const [isInternetOn, setIsInternetOn] = useState(false)
    const [plates, setPlates] = useState<IPlate[]>([])

    useEffect(() => {
        setInterval(internetConnectionHealthCheck, 3000)
        GetData()
    }, []);

    useEffect(() => {
        console.log({plates})
    }, [plates]);

    function getInternetString() {
        if (isInternetOn) return "on"
        return "off"
    }

    function internetConnectionHealthCheck() {
        // console.log("check");
        setIsInternetOn(navigator.onLine)
    }

    async function GetData() {
        const res = await api.get("/plates")
        setPlates(res.data)
    }

    async function saveRandomPlate() {
        const payload = getRandomPlate()
        await api.post("/plates", payload).then(r => console.log(r.data))
        GetData()
    }

    async function deleteLatestPlate() {
        console.log(plates.length)
        if (plates.length == 0) {
            await GetData()
        }

        if (plates.length > 0) {
            const latestId = plates.pop().id
            await api.delete(`/plates/${latestId}`)
            GetData()
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
                <br/>

                <button onClick={() => setIsInternetOn(!isInternetOn)}>
                    switch internet
                </button>
            </div>

            <div className="card">
                <button onClick={() => GetData()}>
                    GET
                </button>
                <button onClick={() => saveRandomPlate()}>
                    POST
                </button>
                <button onClick={() => deleteLatestPlate()}>
                    DELETE
                </button>
            </div>

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
