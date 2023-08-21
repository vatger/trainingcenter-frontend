import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { UserModel } from "@/models/UserModel";
import { useEffect, useState } from "react";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { TrainingRequestModel } from "@/models/TrainingRequestModel";

/**
 * Creates a new training session
 * @param users
 * @param course_uuid
 * @param training_type_id
 * @param training_station_id
 * @param date
 */
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

/**
 * Updates the session given the UUID
 */
async function updateSession(uuid: string | undefined, data: any) {
    return axiosInstance.patch("/administration/training-session/" + uuid, data);
}

/**
 * Returns a list of planned training sessions
 */
function getPlanned() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingSessions, setTrainingSessions] = useState<TrainingSessionModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-session/planned")
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

/**
 * Returns a session's information by UUID
 * @param uuid
 */
function getByUUID(uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingSession, setTrainingSession] = useState<TrainingSessionModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-session/" + uuid)
            .then((res: AxiosResponse) => {
                setTrainingSession(res.data as TrainingSessionModel);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingSession,
        setTrainingSession,
        loading,
        loadingError,
    };
}

/**
 * Deletes a training session
 * @param training_session_id
 */
async function deleteTrainingSession(training_session_id?: number) {
    return axiosInstance.delete("/administration/training-session/training", {
        data: {
            training_session_id: training_session_id,
        },
    });
}

export default {
    createTrainingSession,
    updateSession,
    deleteTrainingSession,
    getByUUID,
    getPlanned,
};
