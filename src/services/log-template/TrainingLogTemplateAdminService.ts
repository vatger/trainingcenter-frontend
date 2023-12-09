import { useEffect, useState } from "react";
import { TrainingLogTemplateModel } from "../../models/TrainingLogTemplateModel";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponseError } from "../../exceptions/APIResponseError";

/**
 * Gets all training log templates that are stored in the database
 */
function getAll() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingLogTemplates, setTrainingLogTemplates] = useState<TrainingLogTemplateModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-log/template/min")
            .then((res: AxiosResponse) => {
                setTrainingLogTemplates(res.data as TrainingLogTemplateModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_TRAINING_LOG_LOAD",
                        message: "Failed to load training logs",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingLogTemplates,
        loading,
        loadingError,
    };
}

async function update(id: string, data: object) {
    return axiosInstance.patch(`/administration/training-log/template/${id}`, data);
}

async function destroy(id: number) {
    return axiosInstance.delete(`/administration/training-log/template/${id}`);
}

export default {
    getAll,
    update,
    destroy,
};
