import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { TrainingRequestModel } from "../../models/TrainingRequestModel";

/**
 * Returns all courses that I can mentor (depending on my mentor group and course relation)
 */
function getOpen() {
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

export default {
    getOpen,
    getByUUID,
};
