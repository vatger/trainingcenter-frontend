import { useEffect, useState } from "react";
import { CourseModel } from "@/models/CourseModel";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponseError } from "@/exceptions/APIResponseError";

/**
 * Gets all courses that I am not in any way affiliated to
 * i.e. not enrolled and not completed!
 */
function getAvailableCourses() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<APIResponseError>(undefined);
    const [courses, setCourses] = useState<CourseModel[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/course/available")
            .then((res: AxiosResponse) => {
                const data = res.data as CourseModel[];
                setCourses(data);
            })
            .catch((err: AxiosError) => {
                setLoadingError({
                    error: err,
                    custom: {
                        code: "ERR_API_COURSE_AVL_LOAD",
                        message: "Failed to load my available courses",
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
 * Enrol in a course specified by a course_id
 * @param course_id
 */
async function enrol(course_id: number): Promise<void> {
    return axiosInstance.put("/course/enrol", {
        course_id: course_id,
    });
}

/**
 * Unenrols the current user from the course
 * @param course_id
 */
async function withdraw(course_id?: number): Promise<void> {
    return axiosInstance.delete("/course/withdraw", {
        data: {
            course_id: course_id,
        },
    });
}

export default {
    getAvailableCourses,
    enrol,
    withdraw,
};
