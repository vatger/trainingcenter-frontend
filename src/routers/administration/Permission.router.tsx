import { Route, Routes, useLocation } from "react-router-dom";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import React from "react";
import { PermissionListView } from "@/pages/administration/tech/permission/list/PermissionList.view";
import { RoleViewView } from "@/pages/administration/tech/permission/view/RoleView.view";

export function PermissionRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<PermissionListView />} />
            <Route path={"roles/:role_id"} element={<RoleViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
