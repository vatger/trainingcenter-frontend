import { useEffect, useState } from "react";
import { TrainingLogTemplateModel } from "../../models/TrainingLogTemplate.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponseError } from "../../exceptions/APIResponseError";

/**
 * Gets all training log templates that are stored in the database
 */
type GetAllT = { trainingLogTemplates: TrainingLogTemplateModel[]; loading: boolean; loadingError: APIResponseError };
function getAll(): GetAllT {
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

/**
 * Create a new training log template
 * @param data
 */
async function create(data: object): Promise<TrainingLogTemplateModel> {
    return axiosInstance
        .put("/administration/training-log/template", { data: data })
        .then((res: AxiosResponse) => {
            return res.data as TrainingLogTemplateModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getAll,
    create,
};
