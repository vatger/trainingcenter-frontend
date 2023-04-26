import { axiosInstance } from "../../utils/network/AxiosInstance";
import { MentorGroupModel } from "../../models/MentorGroup.model";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { CourseModel } from "../../models/Course.model";
import { APIResponseError } from "../../exceptions/APIResponseError";

/**
 * Returns all courses that are associated to the current user (i.e. enrolled in course or completed)
 */
function getCourses() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [courses, setCourses] = useState<CourseModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/courses/my")
            .then((res: AxiosResponse) => {
                setCourses(res.data as CourseModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MY_COURSE_LOAD",
                        message: "Failed to load my courses",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        courses,
        loading,
        loadingError,
    };
}

/**
 * Gets courses that are active and associated to the current user (i.e. not completed)
 */
function getActiveCourses() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [courses, setCourses] = useState<CourseModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/course/active")
            .then((res: AxiosResponse) => {
                setCourses(res.data as CourseModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MY_COURSE_LOAD",
                        message: "Failed to load my courses",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        courses,
        loading,
        loadingError,
    };
}

/**
 * Gets the current user's mentor groups that are in some way affiliated to him (user, admin, course-manager)
 */
function getMentorGroups() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [mentorGroups, setMentorGroups] = useState<MentorGroupModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/user-info/mentor-group")
            .then((res: AxiosResponse) => {
                setMentorGroups(res.data as MentorGroupModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MY_MENTOR_GROUP_LOAD",
                        message: "Failed to load my mentor groups",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        mentorGroups,
        loading,
        loadingError,
    };
}

/**
 * Gets the current user's mentor groups in which he/she is a course-manager (can_manage_course flag set)
 */
function getCourseManagerMentorGroups() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [mentorGroups, setMentorGroups] = useState<MentorGroupModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/user-info/mentor-group/cm")
            .then((res: AxiosResponse) => {
                setMentorGroups(res.data as MentorGroupModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MY_MENTOR_GROUP_LOAD",
                        message: "Failed to load my mentor groups",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        mentorGroups,
        loading,
        loadingError,
    };
}

export default {
    getCourses,
    getActiveCourses,
    getMentorGroups,
    getCourseManagerMentorGroups,
};
