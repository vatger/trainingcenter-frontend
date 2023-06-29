import { useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "../../models/TrainingSessionModel";

function getSessionByUUID(uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingSession, setTrainingSession] = useState<TrainingSessionModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/training-session/" + (uuid ?? "-1"))
            .then((res: AxiosResponse) => {
                setTrainingSession(res.data as TrainingSessionModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_TRAINING_TYPE_DATA",
                        message: "Failed to load training exceptions",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingSession,
        loading,
        loadingError,
    };
}

async function withdrawFromSessionByUUID(sessionUUID?: string) {
    return axiosInstance.delete("/training-session/withdraw/" + (sessionUUID ?? "-1")).then((res: AxiosResponse) => {
        return res;
    });
}

export default {
    getSessionByUUID,
    withdrawFromSessionByUUID,
};
