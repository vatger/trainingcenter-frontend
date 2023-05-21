import { axiosInstance } from "../../utils/network/AxiosInstance";
import { TrainingTypeModel } from "../../models/TrainingTypeModel";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { useEffect, useState } from "react";
import { TrainingStationModel } from "../../models/TrainingStationModel";

/**
 * Gets all training exceptions currently stored in the database
 */
function getAll() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingTypes, setTrainingTypes] = useState<TrainingTypeModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-type")
            .then((res: AxiosResponse) => {
                setTrainingTypes(res.data as TrainingTypeModel[]);
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
        trainingTypes,
        loading,
        loadingError,
    };
}

/**
 * Gets the training type by its id
 * @param id
 */
function getByID(id?: number | string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingType, setTrainingType] = useState<TrainingTypeModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-type/" + id)
            .then((res: AxiosResponse) => {
                setTrainingType(res.data as TrainingTypeModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_TRAINING_TYPE_DATA_INFO",
                        message: "Failed to load training type information",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingType,
        setTrainingType,
        loading,
        loadingError,
    };
}

/**
 * Adds a station to this training type
 * @param training_type_id
 * @param training_station_id
 */
async function addStationByID(training_type_id: string | number, training_station_id: number): Promise<TrainingStationModel> {
    return axiosInstance
        .put("/administration/training-type/station", {
            data: {
                training_type_id: training_type_id,
                training_station_id: training_station_id,
            },
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingStationModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Removes a station from this training type
 * @param training_type_id
 * @param training_station_id
 */
async function removeStationByID(training_type_id: string | number, training_station_id: number): Promise<void> {
    return axiosInstance
        .delete("/administration/training-type/station", {
            data: {
                data: {
                    training_type_id: training_type_id,
                    training_station_id: training_station_id,
                },
            },
        })
        .then(() => {
            return;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Creates a new training type based on the data provided
 * @param data
 */
async function create(data: object): Promise<TrainingTypeModel> {
    return axiosInstance
        .put("/administration/training-type", {
            data: data,
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingTypeModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Updates the training type specified by id
 * @param id
 * @param data
 */
async function update(id: number | string, data: object): Promise<TrainingTypeModel> {
    return axiosInstance
        .patch("/administration/training-type/" + id, {
            data: data,
        })
        .then((res: AxiosResponse) => {
            return res.data as TrainingTypeModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getAll,
    getByID,
    create,
    update,
};
