import { axiosInstance } from "../../utils/network/AxiosInstance";
import { SystemlogModel } from "../../models/Systemlog.model";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

/**
 * Returns an array of all System-logs currently stored in the database
 */
type GetAllT = { systemLogs: SystemlogModel[]; loading: boolean; loadingError: APIResponseError };
function getAll(): GetAllT {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [systemLogs, setSystemLogs] = useState<SystemlogModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/syslog")
            .then((res: AxiosResponse) => {
                setSystemLogs(res.data as SystemlogModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_SYSLOG_DATA",
                        message: "Failed to load system logs",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        systemLogs,
        loading,
        loadingError,
    };
}

/**
 * Gets all information associated with system log
 */
type GetInformationByIDT = { systemLog: SystemlogModel | undefined; loading: boolean; loadingError: APIResponseError };
function getInformationByID(id?: string | number): GetInformationByIDT {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [systemLog, setSystemLog] = useState<SystemlogModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/syslog/" + id)
            .then((res: AxiosResponse) => {
                setSystemLog(res.data as SystemlogModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_SYSLOG_DATA_INFO",
                        message: "Failed to load system log information",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        systemLog,
        loading,
        loadingError,
    };
}

export default {
    getAll,
    getInformationByID,
};
