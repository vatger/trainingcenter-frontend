import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { UserModel } from "@/models/UserModel";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { CourseModel } from "@/models/CourseModel";

/**
 * Gets the user's data (VATSIM Data) excluding sensitive data like the E-Mail
 */
function getUserData(user_id?: string) {
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
 * Returns the basic details of the user including CID and Full Name
 * @param user_id
 */
async function getUserBasicDetails(user_id: string) {
    return axiosInstance.get("/administration/user/data/basic", {
        params: {
            user_id: user_id,
        },
    });
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

/**
 * Returns all the user's courses that the current user is also a mentor of
 * Courses that the user is not a mentor of will be filtered out
 */
function getUserCoursesMatch(userID?: number) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [courses, setCourses] = useState<CourseModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/user/course/match", {
                params: {
                    user_id: userID,
                },
            })
            .then((res: AxiosResponse) => {
                setCourses(res.data as CourseModel[]);
            })
            .catch((err: AxiosError) => {
                // custom stuff
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        courses,
        loading,
        loadingError,
    };
}

async function getUserNotesByCourseID(courseID: string, userID?: string) {
    return axiosInstance.get("/administration/user/notes/course", {
        params: {
            courseID: courseID,
            userID: userID,
        },
    });
}

export default {
    getUserData,
    getUserBasicDetails,
    getAllUsers,
    getAllUsersMinimalData,
    getUserCoursesMatch,
    getUserNotesByCourseID,
};
