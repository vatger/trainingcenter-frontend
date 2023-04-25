import { APIResponseError } from "../../exceptions/APIResponseError";
import { useEffect, useState } from "react";
import { TrainingStationModel } from "../../models/TrainingStation.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

type GetAllT = { trainingStations: TrainingStationModel[]; loading: boolean; loadingError: APIResponseError };
function getAll(): GetAllT {
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
                // TODO HANDLE
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
