import { Route, Routes, useLocation } from "react-router-dom";
import { OpenTrainingRequestList } from "@/pages/administration/mentor/request/open-request-list/OpenTrainingRequestList";
import { OpenTrainingRequestView } from "@/pages/administration/mentor/request/open-request-view/OpenTrainingRequest.view";
import { MentorTrainingListView } from "@/pages/administration/mentor/training-session/planned-list/MentorTrainingList.view";
import { MentorTrainingView } from "@/pages/administration/mentor/training-session/planned-view/MentorTraining.view";
import { TrainingSessionLogsCreateView } from "@/pages/administration/mentor/training-session/session-log-create/TrainingSessionLogsCreate.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function TrainingRequestRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"open"}>
                <Route path={""} element={<OpenTrainingRequestList />} />
                <Route path={":uuid"} element={<OpenTrainingRequestView />} />
            </Route>

            <Route path={"planned"}>
                <Route path={""} element={<MentorTrainingListView />} />
                <Route path={":uuid"} element={<MentorTrainingView />} />
                <Route path={":uuid/logs-create"} element={<TrainingSessionLogsCreateView />} />
            </Route>

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
