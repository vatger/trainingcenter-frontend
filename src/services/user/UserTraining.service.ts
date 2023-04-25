import { useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { TrainingRequestModel } from "../../models/TrainingRequest.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

function getAllTrainingRequests() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequests, setTrainingRequests] = useState<TrainingRequestModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/user-info/training-request")
            .then((res: AxiosResponse) => {
                setTrainingRequests(res.data as TrainingRequestModel[]);
            })
            .catch((err: AxiosError) => {
                console.log("Error");
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingRequests,
        loading,
        loadingError,
    };
}

function getActiveTrainingRequestsByCourseUUID(course_uuid?: string | number) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingRequests, setTrainingRequests] = useState<TrainingRequestModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/user-info/training-request/" + course_uuid)
            .then((res: AxiosResponse) => {
                const data: TrainingRequestModel[] = res.data as TrainingRequestModel[];
                const activeRequests = data.filter((tr: TrainingRequestModel) => {
                    return tr.status != "completed" && tr.status != "cancelled";
                });

                setTrainingRequests(activeRequests);
            })
            .catch((err: AxiosError) => {
                console.log("Error");
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

function destroyTrainingRequestByUUID(uuid?: string): Promise<void> {
    return axiosInstance
        .delete("/training-request", {
            data: {
                data: {
                    request_uuid: uuid,
                },
            },
        })
        .then((res: AxiosResponse) => {
            return;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getAllTrainingRequests,
    getActiveTrainingRequestsByCourseUUID,
    destroyTrainingRequestByUUID,
};
