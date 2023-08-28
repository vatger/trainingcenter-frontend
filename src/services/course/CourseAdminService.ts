import { axiosInstance } from "@/utils/network/AxiosInstance";
import React, { useEffect, useState } from "react";
import { CourseModel, CourseSkillTemplateModel } from "@/models/CourseModel";
import { AxiosError, AxiosResponse } from "axios";
import { UserModel } from "@/models/UserModel";
import { APIResponseError } from "@/exceptions/APIResponseError";
import { MentorGroupModel } from "@/models/MentorGroupModel";
import { NavigateFunction } from "react-router-dom";
import ToastHelper from "@/utils/helper/ToastHelper";
import useApi from "@/utils/hooks/useApi";

export async function getEditableCourses() {
    return axiosInstance.get("/administration/course/editable");
}

function create(data: object, navigate: NavigateFunction, setIsSubmitting: React.Dispatch<boolean>) {
    axiosInstance
        .put("/administration/course", { data: data })
        .then((res: AxiosResponse) => {
            const course = res.data as CourseModel;

            navigate(`/administration/course/${course.uuid}`);
            ToastHelper.success(`Kurs "${course.name}" erfolgreich erstellt`);
        })
        .catch((err: AxiosError) => {
            ToastHelper.error("Fehler beim Erstellen des Kurses");
            throw err;
        })
        .finally(() => setIsSubmitting(false));
}

/**
 * Removes a user
 * @param data
 */
function removeUserByID(data: { course_id?: string | number; user_id?: number }) {
    return axiosInstance.delete("/administration/course/info/user", {
        data: {
            data: data,
        },
    });
}

/**
 * Updates a given course
 * @param data
 */
async function update(data: object): Promise<CourseModel> {
    return axiosInstance.patch("/administration/course/info/update", { data: data }).then((res: AxiosResponse) => {
        return res.data as CourseModel;
    });
}

/**
 * Remove mentor group with mentor_group_id from course with course_uuid
 * @param data
 */
function removeMentorGroupByID(data: { course_id: number; mentor_group_id: number }): Promise<void> {
    return axiosInstance.delete("/administration/course/info/mentor-group", {
        data: {
            data: data,
        },
    });
}

export default {
    create,
    update,
    removeUserByID,
    removeMentorGroupByID,
};
