import { axiosInstance } from "@/utils/network/AxiosInstance";
import { CourseModel } from "@/models/CourseModel";
import { AxiosResponse } from "axios";

export async function getEditableCourses() {
    return axiosInstance.get("/administration/course/editable");
}

async function createCourse(data: object) {
    return axiosInstance.post("/administration/course", data).then((res: AxiosResponse) => {
        return res.data as { uuid: string };
    });
}

/**
 * Removes a user
 * @param data
 */
function removeUserByID(data: { course_uuid?: string | number; user_id?: number }) {
    return axiosInstance.delete(`/administration/course/user/${data.course_uuid}`, {
        data: data,
    });
}

/**
 * Updates a given course
 * @param data
 */
async function update(data: object): Promise<CourseModel> {
    return axiosInstance.patch("/administration/course", data);
}

/**
 * Remove mentor group with mentor_group_id from course with course_uuid
 * @param data
 */
function removeMentorGroupByID(data: { course_uuid: string | undefined; mentor_group_id: number }): Promise<void> {
    return axiosInstance.delete(`/administration/course/mentor-group/${data.course_uuid}`, {
        data: data,
    });
}

export default {
    createCourse,
    update,
    removeUserByID,
    removeMentorGroupByID,
};
