import {TrainingRequestModel} from "../../models/TrainingRequest.model";
import {axiosInstance} from "../../utils/network/AxiosInstance";
import {AxiosError, AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {APIResponseError} from "../../exceptions/APIResponseError";

/**
 * Creates a training request
 * @param data
 */
async function create(data: object): Promise<TrainingRequestModel> {
    return axiosInstance
        .post("/training-request", { data: data })
        .then((res: AxiosResponse) => {
            return res.data as TrainingRequestModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Gets all open training requests for the currently logged in user
 */
function getOpen() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [openTrainingRequests, setOpenTrainingRequests] = useState<TrainingRequestModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/training-request/open")
            .then((res: AxiosResponse) => {
                setOpenTrainingRequests(res.data as TrainingRequestModel[]);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        openTrainingRequests,
        loading,
        loadingError,
    };
}

function getByUUID(uuid: string | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequest, setTrainingRequest] = useState<TrainingRequestModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/training-request/" + (uuid ?? "-1"))
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
    create,
    getOpen,
    getByUUID,
};
