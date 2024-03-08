import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { SyslogListView } from "@/pages/administration/tech/syslog/list/SyslogList.view";
import { SyslogViewView } from "@/pages/administration/tech/syslog/view/SyslogView.view";

export function SysLogRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<SyslogListView />} />
            <Route path={":id"} element={<SyslogViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
