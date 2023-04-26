import { useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { TrainingTypeModel } from "../../models/TrainingType.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

function getByID(id?: number | string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingType, setTrainingType] = useState<TrainingTypeModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/training-type/" + id)
            .then((res: AxiosResponse) => {
                setTrainingType(res.data as TrainingTypeModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_TRAINING_TYPE_ID_LOAD",
                        message: "Failed to load training type by id",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingType,
        loading: loading,
        loadingError,
    };
}

export default {
    getByID,
};
