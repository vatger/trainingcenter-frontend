import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse, Method, ResponseType } from "axios";
import { axiosInstance } from "@/utils/network/AxiosInstance";

interface IUseApi {
    url: string;
    method: Method;
    params?: any;
    data?: any;
    responseType?: ResponseType;
}

interface IUseApiReturn<T> {
    loading: boolean;
    loadingError: AxiosError | undefined;
    data: T | undefined;
    setData: React.Dispatch<T>;
}

/**
 * Makes an API Request to the specified url and returns the result of that query cast to the type of T
 * Note: This can only be used inside a React component due to the use of useEffect
 * @param props
 */
function useApi<T>(props: IUseApi): IUseApiReturn<T> {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<AxiosError | undefined>(undefined);
    const [data, setData] = React.useState<T | undefined>(undefined);

    useEffect(() => {
        axiosInstance({
            method: props.method,
            params: props.params,
            data: data,
            url: props.url,
            responseType: props.responseType ?? "json",
        })
            .then((res: AxiosResponse) => {
                setData(res.data as T);
            })
            .catch((err: AxiosError) => {
                setLoadingError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        loading: loading,
        loadingError: loadingError,
        data: data,
        setData: setData,
    };
}

export default useApi;
