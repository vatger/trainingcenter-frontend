import { Route, Routes, useLocation } from "react-router-dom";
import { TrainingStationCreateView } from "@/pages/administration/atd/training-station/training-station-create/TrainingStationCreate.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function TrainingStationRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"create"} element={<TrainingStationCreateView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
