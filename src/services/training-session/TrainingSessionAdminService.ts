import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import {UserModel} from "@/models/UserModel";

async function createTrainingSession(users: UserModel[], course_uuid?: string, training_type_id?: number, date?: string): Promise<TrainingSessionModel> {
    if (users.length == 0) {
        throw new Error("At least one user must exist");
    }

    return axiosInstance
        .put("/administration/training-session/training", {
            data: {
                user_ids: users.map(u => u.id),
                course_uuid: course_uuid,
                training_type_id: training_type_id,
                date: date,
            },
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingSessionModel;
        });
}

export default {
    createTrainingSession,
};
