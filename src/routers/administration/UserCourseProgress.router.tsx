import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { UserCourseProgressView } from "@/pages/administration/mentor/user-course-progress/view/UserCourseProgress.view";

export function UserCourseProgressRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={":course_uuid/:user_id"} element={<UserCourseProgressView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
