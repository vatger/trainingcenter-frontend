import { Route, Routes, useLocation } from "react-router-dom";
import { SyslogListView } from "@/pages/administration/tech/syslog/syslog-list/SyslogList.view";
import { SyslogViewView } from "@/pages/administration/tech/syslog/syslog-view/SyslogView.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

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
