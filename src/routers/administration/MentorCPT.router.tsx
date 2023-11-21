import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { CPTCreateView } from "@/pages/administration/mentor/cpt/cpt-create/CPTCreate.view";
import { CPTListView } from "@/pages/administration/mentor/cpt/cpt-list/CPTList.view";

export function MentorCPTRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"create"} element={<CPTCreateView />} />
            <Route path={"open"} element={<CPTListView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
