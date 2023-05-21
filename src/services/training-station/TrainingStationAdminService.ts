import { APIResponseError } from "../../exceptions/APIResponseError";
import { useEffect, useState } from "react";
import { TrainingStationModel } from "../../models/TrainingStationModel";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

/**
 * Gets a list of all training stations stored in the database
 */
function getAll() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingStations, setTrainingStations] = useState<TrainingStationModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/training-station")
            .then((res: AxiosResponse) => {
                setTrainingStations(res.data as TrainingStationModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_TRAINING_STATION_ALL",
                        message: "Failed to load list of all training stations",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingStations,
        loading,
        loadingError,
    };
}

export default {
    getAll,
};
