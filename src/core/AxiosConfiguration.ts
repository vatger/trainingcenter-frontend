import {AxiosRequestConfig} from "axios";
import {Config} from "./Config";

export const AxiosConfiguration: AxiosRequestConfig = {
    baseURL: Config.API_BASE_URL,
    withCredentials: true,
    timeout: 5000,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" },
};
