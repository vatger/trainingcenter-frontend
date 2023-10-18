import { Route, Routes, useLocation } from "react-router-dom";
import { AdminCourseListView } from "@/pages/administration/lm/course/list/CourseList.view";
import { CourseCreateView } from "@/pages/administration/lm/course/create/CourseCreate.view";
import { CourseViewView } from "@/pages/administration/lm/course/view/CourseView.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function CourseRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<AdminCourseListView />} />
            <Route path={"create"} element={<CourseCreateView />} />
            <Route path={":uuid"} element={<CourseViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
