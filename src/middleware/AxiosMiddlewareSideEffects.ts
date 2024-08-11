import {InternalAxiosRequestConfig} from "axios";
import {TStore} from "../redux/store.tsx";
import {getPlates} from "../redux/slices/plateReducer.ts";

type TPossibleUrls = 'plates' | 'health'

export function execute(config: InternalAxiosRequestConfig, store: TStore) {
    const URL = formatUrl(config.url) as TPossibleUrls;
    switch (URL) {
        case "health": {
            break
        }
        case "plates": {
            casePlates(config, store)
            break
        }
        default:
            console.error("undefined url", URL)
    }
}

function formatUrl(original: string | undefined): string {
    if (original === undefined) return ''
    const res = original.split('/')
    return res[1]
}

function casePlates(config: InternalAxiosRequestConfig, store: TStore) {
    const method = config.method;
    switch (method) {
        case "post": {
            console.log("POST PLATES")
            fetchPlate(store)
            break
        }

        case "get": {
            console.log("GET PLATES")
            break
        }

        case "delete": {
            console.log("DELETE PLATES")
            fetchPlate(store)
            break
        }
        default:
            console.error("undefined method: ", method)
    }

    function fetchPlate(store: TStore) {
        setTimeout(function () {
            store.dispatch(getPlates())
        }, 500);
    }
}
