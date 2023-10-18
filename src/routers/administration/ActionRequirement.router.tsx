import { Route, Routes, useLocation } from "react-router-dom";
import { CourseCreateView } from "@/pages/administration/lm/course/create/CourseCreate.view";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import React from "react";
import { ActionListView } from "@/pages/administration/lm/actions/list/ActionList.view";

export function ActionRequirementRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<ActionListView />} />
            <Route path={"create"} element={<CourseCreateView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
