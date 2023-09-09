import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { NotificationModel } from "../../models/NotificationModel";
import { useEffect, useState } from "react";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { UserModel } from "@/models/UserModel";

/**
 * Return all unread notifications
 */
async function getUnreadNotifications(): Promise<NotificationModel[]> {
    return axiosInstance
        .get("/notification/unread")
        .then((res: AxiosResponse) => {
            return res.data as NotificationModel[];
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

function markAllAsRead() {
    return axiosInstance.post("/notification/read/all");
}

function deleteNotification(notificationID: number) {
    return axiosInstance.delete("/notification", {
        data: {
            notification_id: notificationID,
        },
    });
}

function toggleRead(notificationID: number) {
    return axiosInstance.post("/notification/toggle", { notification_id: notificationID });
}

export default {
    getUnreadNotifications,
    markAllAsRead,
    deleteNotification,
    toggleRead,
};
