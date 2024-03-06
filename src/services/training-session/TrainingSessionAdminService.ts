import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { UserModel } from "@/models/UserModel";
import { useEffect, useState } from "react";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { TrainingRequestModel } from "@/models/TrainingRequestModel";
import { TrainingLogTemplateModel } from "@/models/TrainingLogTemplateModel";

/**
 * Creates a new training session
 * @param users
 * @param cpt_beisitzer
 * @param course_uuid
 * @param training_type_id
 * @param training_station_id
 * @param date
 */
async function createTrainingSession(
    users: UserModel[],
    course_uuid?: string,
    training_type_id?: number,
    training_station_id?: string | null,
    date?: string
): Promise<TrainingSessionModel> {
    if (users.length == 0) {
        throw new Error();
    }

    return axiosInstance
        .post("/administration/training-session/training", {
            user_ids: users.map(u => u.id),
            training_station_id: training_station_id == "-1" ? null : Number(training_station_id),
            course_uuid: course_uuid,
            training_type_id: training_type_id,
            date: date,
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingSessionModel;
        });
}

/**
 * Gets an array of users that are participants in the specified training session
 * @param uuid
 */
function getParticipants(uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [participants, setParticipants] = useState<UserModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-session/participants/" + uuid)
            .then((res: AxiosResponse) => {
                setParticipants(res.data as UserModel[]);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        participants,
        setParticipants,
        loading,
        loadingError,
    };
}

/**
 * Gets the log template associated to the specific session's training type
 * @param uuid
 */
function getLogTemplate(uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [logTemplate, setLogTemplate] = useState<TrainingLogTemplateModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-session/log-template/" + uuid)
            .then((res: AxiosResponse) => {
                setLogTemplate(res.data as TrainingLogTemplateModel);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        logTemplate,
        setLogTemplate,
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
    deleteTrainingSession,
    getLogTemplate,
    getParticipants,
};
