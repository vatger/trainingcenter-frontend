import { Route, Routes, useLocation } from "react-router-dom";
import { LogTemplateListView } from "@/pages/administration/atd/log-template/log-template-list/LogTemplateList.view";
import { LogTemplateViewView } from "@/pages/administration/atd/log-template/log-template-view/LogTemplateView.view";
import { LogTemplateCreateView } from "@/pages/administration/atd/log-template/log-template-create/LogTemplateCreate.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function LogTemplateRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"/"} element={<LogTemplateListView />} />
            <Route path={"/:id"} element={<LogTemplateViewView />} />
            <Route path={"/create"} element={<LogTemplateCreateView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
