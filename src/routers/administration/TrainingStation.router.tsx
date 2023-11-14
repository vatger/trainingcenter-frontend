import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { TrainingStationListView } from "@/pages/administration/atd/training-station/training-station-list/TrainingStationList.view";

export function TrainingStationRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<TrainingStationListView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
