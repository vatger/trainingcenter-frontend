import { useEffect, useState } from "react";
import { CourseModel } from "../../models/Course.model";
import { axiosInstance } from "../../utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponseError } from "../../exceptions/APIResponseError";

/**
 * Gets all courses that I am not in any way affiliated to
 * i.e. not enrolled and not completed!
 */
type GetAvailableCoursesT = { courses: CourseModel[]; loading: boolean; loadingError: APIResponseError };
function getAvailableCourses(): GetAvailableCoursesT {
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
    return axiosInstance
        .put("/course/enrol", {
            course_id: course_id,
        })
        .then(() => {
            return;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
}

export default {
    getAvailableCourses,
    enrol,
};
