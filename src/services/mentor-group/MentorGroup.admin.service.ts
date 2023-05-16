import {axiosInstance} from "../../utils/network/AxiosInstance";
import {AxiosError, AxiosResponse} from "axios";
import {MentorGroupModel} from "../../models/MentorGroup.model";
import {useEffect, useState} from "react";
import {APIResponseError} from "../../exceptions/APIResponseError";

/**
 * Creates a new mentor group taking in data
 * @param data - JSON Serialized form data
 */
async function create(data: object): Promise<MentorGroupModel> {
    return axiosInstance
        .post("/administration/mentor-group", {
            data: data,
        })
        .then((res: AxiosResponse) => {
            return res.data as MentorGroupModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

/**
 * Gets the information of a mentor group by its ID
 * @param mentor_group_id
 */
function getByID(mentor_group_id: string | number | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [mentorGroup, setMentorGroup] = useState<MentorGroupModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/mentor-group/" + (mentor_group_id ?? -1))
            .then((res: AxiosResponse) => {
                setMentorGroup(res.data as MentorGroupModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MENTOR_GROUP_INFO_LOAD",
                        message: "Failed to load mentor group data",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        mentorGroup,
        loading,
        loadingError,
    };
}

/**
 * Gets an array of mentor groups that I can edit (i.e. the admin flag is set)
 */
function getEditableMentorGroups() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [mentorGroups, setMentorGroups] = useState<MentorGroupModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/mentor-group/admin")
            .then((res: AxiosResponse) => {
                setMentorGroups(res.data as MentorGroupModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MENTOR_GROUP_CM_LOAD",
                        message: "Failed to load mentor groups with course-manager permissions",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return { mentorGroups, loading, loadingError };
}

export default {
    create,
    getByID,
    getEditableMentorGroups,
};
