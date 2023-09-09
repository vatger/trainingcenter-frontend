import { Route, Routes, useLocation } from "react-router-dom";
import { UserListView } from "@/pages/administration/mentor/users/user-search/UserList.view";
import { UserViewView } from "@/pages/administration/mentor/users/user-view/UserView.view";
import { RequestFastTrackView } from "@/pages/administration/mentor/users/user-view/_partials/UVRequestFastTrack.subpage";
import { ViewUserNotesView } from "@/pages/administration/mentor/users/user-view/_partials/UVViewUserNotes.subpage";
import React from "react";
import { Error403 } from "@/pages/errors/403";
import { Error404 } from "@/pages/errors/404";

export function UsersRouter() {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path={"search"} element={<UserListView />} />

                <Route path={":user_id"}>
                    <Route path={""} element={<UserViewView />} />
                    <Route path={"fast-track"} element={<RequestFastTrackView />} />
                    <Route path={"notes"} element={<ViewUserNotesView />} />
                </Route>

                <Route path={"403"} element={<Error403 />} />
                <Route path={"*"} element={<Error404 path={location.pathname} />} />
            </Routes>
        </>
    );
}
