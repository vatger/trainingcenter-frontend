import { axiosInstance } from "../../utils/network/AxiosInstance";
import { SyslogModel } from "../../models/SyslogModel";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

/**
 * Returns an array of all System-logs currently stored in the database
 */
function getAll() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [systemLogs, setSystemLogs] = useState<SyslogModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/syslog")
            .then((res: AxiosResponse) => {
                setSystemLogs(res.data as SyslogModel[]);
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
function getInformationByID(id?: string | number) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [systemLog, setSystemLog] = useState<SyslogModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/syslog/" + id)
            .then((res: AxiosResponse) => {
                setSystemLog(res.data as SyslogModel);
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
