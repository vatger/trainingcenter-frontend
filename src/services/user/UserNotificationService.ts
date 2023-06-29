import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { NotificationModel } from "../../models/NotificationModel";

async function getUnreadNotifications(user_id: number): Promise<NotificationModel[]> {
    return axiosInstance
        .get("/notifications")
        .then((res: AxiosResponse) => {
            return res.data as NotificationModel[];
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getUnreadNotifications,
};
