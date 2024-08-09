import {InternalAxiosRequestConfig} from "axios";

type possbileUrls = '/plates' | '/health'

export function execute(config: InternalAxiosRequestConfig) {

    const url = config.url as possbileUrls;

    switch (url) {
        case "/health": {
            console.log("health");
            break
        }
        case "/plates": {
            casePlates(config)
            break
        }
        default: console.error("undefinerd url", config.url)
    }
}


function casePlates(config: InternalAxiosRequestConfig) {
    switch (config.method) {
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

        default: console.error("undefined method: ", config.method)
    }
}