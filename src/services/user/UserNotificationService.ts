import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { NotificationModel } from "../../models/NotificationModel";
import { useEffect, useState } from "react";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { UserModel } from "@/models/UserModel";

async function getUnreadNotifications(): Promise<NotificationModel[]> {
    return axiosInstance
        .get("/notifications/unread")
        .then((res: AxiosResponse) => {
            return res.data as NotificationModel[];
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

function getAllNotifications() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [notifications, setNotifications] = useState<NotificationModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/notifications")
            .then((res: AxiosResponse) => {
                setNotifications(res.data as NotificationModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_NOTIFICATIONS_ALL",
                        message: "Failed to load notifications",
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        notifications,
        setNotifications,
        loading,
        loadingError,
    };
}

export default {
    getUnreadNotifications,
    getAllNotifications,
};
