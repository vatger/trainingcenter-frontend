import {AxiosError, AxiosProgressEvent, AxiosResponse} from "axios";
import {axiosInstance} from "../../utils/network/AxiosInstance";
import {FastTrackModel} from "../../models/FastTrack.model";
import {useEffect, useState} from "react";
import {APIResponseError} from "../../exceptions/APIResponseError";

/**
 * Creates a fast track request
 * Uploads the data and returns a progress
 * @param data
 * @param progressUpdateFunction
 */
async function create(data: object, progressUpdateFunction: (e: AxiosProgressEvent) => any): Promise<FastTrackModel> {
    return axiosInstance
        .post("/administration/fast-track", data, {
            onUploadProgress: (e: AxiosProgressEvent) => progressUpdateFunction,
            timeout: 60_000,
        })
        .then((res: AxiosResponse) => {
            return res.data as FastTrackModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Gets all fast track requests for a specific user
 * @param user_id
 */
function getRequestsByUserID(user_id?: string | number) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [fastTracks, setFastTracks] = useState<FastTrackModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/fast-track/user", {
                params: {
                    user_id: user_id,
                },
            })
            .then((res: AxiosResponse) => {
                setFastTracks(res.data as FastTrackModel[]);
            })
            .catch((err: AxiosError) => {
                throw err;
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        fastTracks,
        setFastTracks,
        loading,
        loadingError,
    };
}

export default {
    create,
    getRequestsByUserID,
};
