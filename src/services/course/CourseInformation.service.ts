import { useEffect, useState } from "react";
import { CourseModel } from "../../models/Course.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { TrainingSessionModel } from "../../models/TrainingSession.model";
import { APIResponseError } from "../../exceptions/APIResponseError";

/**
 * Returns course information (i.e. the course's data), specified by uuid
 */
type GetCourseInformationByUUIT = { course: CourseModel | undefined; loading: boolean; loadingError: APIResponseError };
function getCourseInformationByUUID(uuid?: string): GetCourseInformationByUUIT {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [course, setCourse] = useState<CourseModel | undefined>(undefined);

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
type GetMyCourseInformationByUUIDT = { course: CourseModel | undefined; loading: boolean; loadingError: APIResponseError };
function getMyCourseInformationByUUID(uuid?: string): GetMyCourseInformationByUUIDT {
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
type GetCourseTrainingInformationByUUIDT = { trainingData: TrainingSessionModel[]; loading: boolean; loadingError: APIResponseError };
function getCourseTrainingInformationByUUID(course_uuid?: string): GetCourseTrainingInformationByUUIDT {
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

export default {
    getCourseInformationByUUID,
    getMyCourseInformationByUUID,
    getCourseTrainingInformationByUUID,
};
