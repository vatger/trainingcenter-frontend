import { useEffect, useState } from "react";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { UserNoteModel } from "../../models/UserNoteModel";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";

/**
 * Gets the user's notes that are not specifically assigned to any course
 */
function getGeneralUserNotes(user_id: string | number | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [userNotes, setUserNotes] = useState<UserNoteModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/user/notes", {
                params: {
                    user_id: user_id,
                },
            })
            .then((res: AxiosResponse) => {
                setUserNotes(res.data as UserNoteModel[]);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        userNotes,
        loading,
        loadingError,
    };
}

export default {
    getGeneralUserNotes,
};
