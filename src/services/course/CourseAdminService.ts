import { axiosInstance } from "@/utils/network/AxiosInstance";
import { useEffect, useState } from "react";
import { CourseModel, CourseSkillTemplateModel } from "@/models/CourseModel";
import { AxiosError, AxiosResponse } from "axios";
import { UserModel } from "@/models/UserModel";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { MentorGroupModel } from "@/models/MentorGroupModel";

export async function getEditableCourses() {
    return axiosInstance.get("/administration/course/editable");
}

function getInformationByUUID(course_uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [course, setCourse] = useState<CourseModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/administration/course/info", { params: { uuid: course_uuid } })
            .then((res: AxiosResponse) => {
                setCourse(res.data as CourseModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_LOAD_COURSE_INFO",
                        message: "Failed to load course information",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        course,
        setCourse,
        loading,
        loadingError,
    };
}

/**
 * Gets all users associated to this course (excluding sensitive information such as E-Mail...)
 */
function getUsersByUUID(course_uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/course/info/user", { params: { uuid: course_uuid } })
            .then((res: AxiosResponse) => {
                setUsers(res.data as UserModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_LOAD_COURSE_USERS",
                        message: "Failed to load users in this course",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        users,
        setUsers,
        loading,
        loadingError,
    };
}

/**
 * Removes a user from the specified course
 * @param course_id
 * @param user_id
 */
function removeUserByID(course_id?: string | number, user_id?: number): Promise<void> {
    return axiosInstance.delete("/administration/course/info/user", {
        data: {
            data: {
                course_id: course_id,
                user_id: user_id,
            },
        },
    });
}

/**
 * Gets a list of mentor groups that are associated to this course, specified by the UUID
 */
function getMentorGroupsByUUID(course_uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [mentorGroups, setMentorGroups] = useState<MentorGroupModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/administration/course/info/mentor-group", { params: { uuid: course_uuid } })
            .then((res: AxiosResponse) => {
                setMentorGroups(res.data as MentorGroupModel[]);
            })
            .catch((err: AxiosError) => {})
            .finally(() => setLoading(false));
    }, []);

    return {
        mentorGroups,
        setMentorGroups,
        loading,
        loadingError,
    };
}

/**
 * Remove mentor group with mentor_group_id from course with course_uuid
 * @param course_id
 * @param mentor_group_id
 */
function removeMentorGroupByID(course_id: number, mentor_group_id: number): Promise<void> {
    return axiosInstance.delete("/administration/course/info/mentor-group", {
        data: {
            data: {
                course_id: course_id,
                mentor_group_id: mentor_group_id,
            },
        },
    });
}

async function create(data: object): Promise<CourseModel> {
    return axiosInstance
        .put("/administration/course", { data: data })
        .then((res: AxiosResponse) => {
            return res.data as CourseModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

async function update(data: object): Promise<CourseModel> {
    return axiosInstance
        .patch("/administration/course/info/update", { data: data })
        .then((res: AxiosResponse) => {
            return res.data as CourseModel;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    create,
    update,
    getInformationByUUID,
    getUsersByUUID,
    removeUserByID,
    getMentorGroupsByUUID,
    removeMentorGroupByID,
};
