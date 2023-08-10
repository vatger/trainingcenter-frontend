import { useEffect, useState } from "react";
import { CourseModel } from "@/models/CourseModel";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { APIResponseError } from "@/exceptions/APIResponseError";

/**
 * Returns course information (i.e. the course's data), specified by uuid
 */
function getCourseInformationByUUID(uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [course, setCourse] = useState<(CourseModel & { enrolled?: boolean }) | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/course/info", {
                params: {
                    uuid: uuid,
                },
            })
            .then((res: AxiosResponse) => {
                setCourse(res.data as CourseModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_COURSE_INFORMATION_LOAD",
                        message: "Failed to load course information",
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        course,
        loading,
        loadingError,
    };
}

/**
 * Returns user information for a given course
 * Includes the users_belong_to_courses table entry for the current user
 */
function getMyCourseInformationByUUID(uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [course, setCourse] = useState<CourseModel | undefined>(undefined);

    useEffect(() => {
        axiosInstance
            .get("/course/info/my", {
                params: {
                    uuid: uuid,
                },
            })
            .then((res: AxiosResponse) => {
                setCourse(res.data?.[0] as CourseModel);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_COURSE_INFORMATION_LOAD",
                        message: "Failed to load course information",
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        course,
        loading,
        loadingError,
    };
}

/**
 * Get training information of course from course UUID
 */
function getCourseTrainingInformationByUUID(course_uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [trainingData, setTrainingData] = useState<TrainingSessionModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/course/info/training", {
                params: {
                    uuid: course_uuid,
                },
            })
            .then((res: AxiosResponse) => {
                setTrainingData(res.data as TrainingSessionModel[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_MY_COURSE_STATUS_LOAD",
                        message: "Failed to load my course status",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        trainingData,
        loading,
        loadingError,
    };
}

function getCourseRequirements(course_uuid?: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [courseRequirements, setCourseRequirements] = useState<{ action: string; req_id: number }[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/course/info/requirements", {
                params: {
                    course_uuid: course_uuid,
                },
            })
            .then((res: AxiosResponse) => {
                setCourseRequirements(res.data as { action: string; req_id: number }[]);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_COURSE_REQ_LOAD",
                        message: "Failed to load course's requirements",
                    },
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        courseRequirements,
        loading,
        loadingError,
    };
}

export default {
    getCourseInformationByUUID,
    getMyCourseInformationByUUID,
    getCourseTrainingInformationByUUID,
    getCourseRequirements,
};
