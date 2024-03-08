import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { JoblogListView } from "@/pages/administration/tech/joblog/list/JoblogList.view";
import { JoblogViewView } from "@/pages/administration/tech/joblog/view/JoblogView.view";

export function JobLogRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<JoblogListView />} />
            <Route path={":id"} element={<JoblogViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
