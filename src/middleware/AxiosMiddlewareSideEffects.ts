import {InternalAxiosRequestConfig} from "axios";

type TPossibleUrls = '/plates' | '/health'

export function execute(config: InternalAxiosRequestConfig) {

    const URL = config.url as TPossibleUrls;

    switch (URL) {
        case "/health": {
            console.log("health");
            break
        }
        case "/plates": {
            casePlates(config)
            break
        }
        default: console.error("undefined url", URL)
    }
}

function casePlates(config: InternalAxiosRequestConfig) {
    const method = config.method;
    switch (method) {
        case "post": {
            console.log("POST PLATES")
            break
        }

        case "get": {
            console.log("GET PLATES")
            break
        }

        case "delete": {
            console.log("DELETE PLATES")
            break
        }
        default: console.error("undefined method: ", method)
    }
}