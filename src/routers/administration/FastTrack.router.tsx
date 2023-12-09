import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { FastTrackListView } from "@/pages/administration/atd/fast-track/list/FastTrackList.view";
import { FastTrackViewView } from "@/pages/administration/atd/fast-track/view/FastTrackView.view";

export function FastTrackRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"view"} element={<FastTrackListView />} />
            <Route path={"view/:id"} element={<FastTrackViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
