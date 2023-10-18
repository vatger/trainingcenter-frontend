import { Route, Routes, useLocation } from "react-router-dom";
import { TrainingTypeListView } from "@/pages/administration/lm/training-type/list/TrainingTypeList.view";
import { TrainingTypeCreateView } from "@/pages/administration/lm/training-type/create/TrainingTypeCreate.view";
import { TrainingTypeViewView } from "@/pages/administration/lm/training-type/view/TrainingTypeView.view";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function TrainingTypeRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={""} element={<TrainingTypeListView />} />
            <Route path={"create"} element={<TrainingTypeCreateView />} />
            <Route path={":id"} element={<TrainingTypeViewView />} />

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
