import { Route, Routes, useLocation } from "react-router-dom";
import { UserListView } from "@/pages/administration/mentor/users/list/UserList.view";
import { UserViewView } from "@/pages/administration/mentor/users/view/UserView.view";
import { RequestFastTrackView } from "@/pages/administration/mentor/users/view/_subpages/UVRequestFastTrack.subpage";
import { UVNotesSubpage } from "@/pages/administration/mentor/users/view/_subpages/UVNotes.subpage";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";
import { AvailableCPTView } from "@/pages/administration/atd/atd-examiner/available-cpt/AvailableCPT.view";

export function ATDExaminerRouter() {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path={"cpt"}>
                    <Route path={"available"} element={<AvailableCPTView />} />
                </Route>

                <Route path={"403"} element={<Error403 />} />
                <Route path={"*"} element={<Error404 path={location.pathname} />} />
            </Routes>
        </>
    );
}
