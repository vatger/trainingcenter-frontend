import { Route, Routes, useLocation } from "react-router-dom";
import { TrainingSessionCreateView } from "@/pages/administration/mentor/training-session/training-session-create/TrainingSessionCreate.view";
import { TrainingSessionCreateFromRequestView } from "@/pages/administration/mentor/training-session/training-session-create/TrainingSessionCreateFromRequest.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function TrainingSessionRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"create"} element={<TrainingSessionCreateView />} />
            <Route path={"create/:uuid"} element={<TrainingSessionCreateFromRequestView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
