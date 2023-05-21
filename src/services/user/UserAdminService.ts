import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { UserModel } from "../../models/UserModel";
import { APIResponseError } from "../../exceptions/APIResponseError";

/**
 * Gets the user's data (VATSIM Data) excluding sensitive data like the E-Mail
 */
function getUserData(user_id: number) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        axiosInstance
            .get("/administration/user/data", {
                params: {
                    user_id: user_id,
                },
            })
            .then((res: AxiosResponse) => {
                setUser(res.data as UserModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_USR_DATA",
                        message: "Failed to load user data for this user",
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        user,
        loading,
        loadingError,
    };
}

/**
 * Returns all users in the database including the user's data (VATSIM Data)
 */
function getAllUsers() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [users, setUserData] = useState<UserModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/user")
            .then((res: AxiosResponse) => {
                setUserData(res.data as UserModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_USR_DATA",
                        message: "Failed to load user data for this user",
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        users,
        loading,
        loadingError,
    };
}

/**
 * Returns all users stored in the database in a minimal format (CID, Name)
 * @returns - Returns an array of users with only their **minimal data (cid, first_name, last_name)** populated!
 */
function getAllUsersMinimalData() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/user/min")
            .then((res: AxiosResponse) => {
                setUsers(res.data as UserModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_USR_MIN_LOAD",
                        message: "Failed to load users (minimal data)",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        users,
        loading,
        loadingError,
    };
}

export default {
    getUserData,
    getAllUsers,
    getAllUsersMinimalData,
};
