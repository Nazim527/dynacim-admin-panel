import axios from "axios";

export const instance = axios.create({
    baseURL: "https://api.tech-it.az/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
    },
})