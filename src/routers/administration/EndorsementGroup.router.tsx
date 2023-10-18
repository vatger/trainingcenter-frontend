import { Route, Routes, useLocation } from "react-router-dom";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import React from "react";
import { EndorsementGroupCreateView } from "@/pages/administration/lm/endorsement-group/create/EndorsementGroupCreate.view";
import { EndorsementGroupListView } from "@/pages/administration/lm/endorsement-group/list/EndorsementGroupList.view";

export function EndorsementGroupRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<EndorsementGroupListView />} />
            <Route path={"create"} element={<EndorsementGroupCreateView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
