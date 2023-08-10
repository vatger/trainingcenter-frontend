import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";

function getTrainingRequestInformation() {}

async function createTrainingSession(user_id?: number, trainingRequestUUID?: string, date?: string): Promise<TrainingSessionModel> {
    return axiosInstance
        .put("/administration/training-session/training", {
            data: {
                user_id: user_id,
                uuid: trainingRequestUUID,
                date: date,
            },
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingSessionModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    createTrainingSession,
};
