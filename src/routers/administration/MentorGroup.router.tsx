import { Route, Routes, useLocation } from "react-router-dom";
import { MentorGroupListView } from "@/pages/administration/lm/mentor-group/mentor-group-list/MentorGroupList.view";
import { MentorGroupCreateView } from "@/pages/administration/lm/mentor-group/mentor-group-create/MentorGroupCreate.view";
import { MentorGroupViewView } from "@/pages/administration/lm/mentor-group/mentor-group-view/MentorGroupView.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function MentorGroupRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<MentorGroupListView />} />
            <Route path={"create"} element={<MentorGroupCreateView />} />
            <Route path={":id"} element={<MentorGroupViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
