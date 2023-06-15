import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { TrainingRequestModel } from "../../models/TrainingRequestModel";

/**
 * Returns all courses that I can mentor (depending on my mentor group and course relation)
 */
function getOpenRequests() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequests, setTrainingRequests] = useState<TrainingRequestModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("administration/training-request")
            .then((res: AxiosResponse) => {
                setTrainingRequests(res.data as TrainingRequestModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_LOAD_TRAINING_REQUEST_OPEN",
                        message: "Failed to load open training requests",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingRequests,
        setTrainingRequests,
        loading,
        loadingError,
    };
}

function getOpenTrainingRequests() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequests, setTrainingRequests] = useState<TrainingRequestModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("administration/training-request/training")
            .then((res: AxiosResponse) => {
                setTrainingRequests(res.data as TrainingRequestModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_LOAD_TRAINING_REQUEST_OPEN",
                        message: "Failed to load open training requests",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingRequests,
        loading,
        loadingError,
    };
}

function getOpenLessonRequests() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequests, setTrainingRequests] = useState<TrainingRequestModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("administration/training-request/lesson")
            .then((res: AxiosResponse) => {
                setTrainingRequests(res.data as TrainingRequestModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_LOAD_TRAINING_REQUEST_OPEN",
                        message: "Failed to load open training requests",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingRequests,
        loading,
        loadingError,
    };
}

/**
 * Gets a training request based by the UUID
 * @param uuid
 */
function getByUUID(uuid: string | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequest, setTrainingRequest] = useState<TrainingRequestModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-request/" + (uuid ?? "-1"))
            .then((res: AxiosResponse) => {
                setTrainingRequest(res.data as TrainingRequestModel);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingRequest,
        loading,
        loadingError,
    };
}

/**
 * Allows a mentor to delete a training request of another user. This is identified by its UUID.
 * @param uuid
 */
async function destroyTrainingRequestByUUID(uuid: string | undefined) {
    return axiosInstance
        .delete("/administration/training-request/" + uuid)
        .then((res: AxiosResponse) => {
            return;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getOpenRequests,
    getOpenTrainingRequests,
    getOpenLessonRequests,
    getByUUID,
    destroyTrainingRequestByUUID,
};
