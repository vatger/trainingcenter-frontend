import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { UserModel } from "@/models/UserModel";
import { useEffect, useState } from "react";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { TrainingRequestModel } from "@/models/TrainingRequestModel";

async function createTrainingSession(
    users: UserModel[],
    course_uuid?: string,
    training_type_id?: number,
    training_station_id?: string,
    date?: string
): Promise<TrainingSessionModel> {
    if (users.length == 0) {
        throw new Error("At least one user must exist");
    }

    console.log(training_station_id);

    return axiosInstance
        .put("/administration/training-session/training", {
            data: {
                user_ids: users.map(u => u.id),
                training_station_id: training_station_id == "-1" ? null : Number(training_station_id),
                course_uuid: course_uuid,
                training_type_id: training_type_id,
                date: date,
            },
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingSessionModel;
        });
}

function getPlanned() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingSessions, setTrainingSessions] = useState<TrainingSessionModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-request/planned")
            .then((res: AxiosResponse) => {
                setTrainingSessions(res.data as TrainingSessionModel[]);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingSessions,
        setTrainingSessions,
        loading,
        loadingError,
    };
}

export default {
    createTrainingSession,
    getPlanned,
};
