import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { AvailableCPTView } from "@/pages/administration/atd/atd-examiner/available-cpt/AvailableCPT.view";
import { MyCPTListView } from "@/pages/administration/atd/atd-examiner/my-cpt/MyCPTList.view";

export function ATDExaminerRouter() {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path={"cpt"}>
                    <Route path={"available"} element={<AvailableCPTView />} />
                    <Route path={"my"} element={<MyCPTListView />} />
                </Route>

                <Route path={"403"} element={<Error403 />} />
                <Route path={"*"} element={<Error404 path={location.pathname} />} />
            </Routes>
        </>
    );
}
