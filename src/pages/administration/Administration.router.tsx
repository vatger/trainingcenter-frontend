import { Route, Routes, useLocation, Location } from "react-router-dom";
import { UserListView } from "./mentor/users/user-search/UserList.view";
import { UserViewView } from "./mentor/users/user-view/UserView.view";
import { RequestFastTrackView } from "./mentor/users/user-view/_subpages/RequestFastTrack.subpage";
import { CourseListView } from "./lm/course/course-list/CourseList.view";
import { CourseCreateView } from "./lm/course/course-create/CourseCreate.view";
import { CourseViewView } from "./lm/course/course-view/CourseView.view";
import { TrainingTypeListView } from "./lm/training-type/training-type-list/TrainingTypeList.view";
import { TrainingTypeCreateView } from "./lm/training-type/training-type-create/TrainingTypeCreate.view";
import { SyslogListView } from "./tech/syslog/syslog-list/SyslogList.view";
import { PermissionListView } from "./tech/permission/permission-list/PermissionList.view";
import { Error403 } from "../errors/403";
import { Error404 } from "../errors/404";
import { RoleViewView } from "./tech/permission/role-view/RoleView.view";
import { LogTemplateCreateView } from "./atd/log-template/log-template-create/LogTemplateCreate.view";
import { MentorGroupCreateView } from "./lm/mentor-group/mentor-group-create/MentorGroupCreate.view";
import { MentorGroupListView } from "./lm/mentor-group/mentor-group-list/MentorGroupList.view";
import { SyslogViewView } from "./tech/syslog/syslog-view/SyslogView.view";
import { TrainingTypeViewView } from "./lm/training-type/training-type-view/TrainingTypeView.view";
import { MentorGroupViewView } from "./lm/mentor-group/mentor-group-view/MentorGroupView.view";
import { ViewUserNotesView } from "./mentor/users/user-view/_subpages/ViewUserNotes.subpage";
import { OpenTrainingRequestList } from "./mentor/request/open-training-request-list/OpenTrainingRequestList";
import { OpenTrainingRequestView } from "./mentor/request/open-training-request-view/OpenTrainingRequestView";

export function AdministrationRouter() {
    const location: Location = useLocation();

    return (
        <Routes>
            <Route path={"users"}>
                <Route path={"search"} element={<UserListView />} />

                <Route path={":user_id"}>
                    <Route path={""} element={<UserViewView />} />
                    <Route path={"fast-track"} element={<RequestFastTrackView />} />
                    <Route path={"notes"} element={<ViewUserNotesView />} />
                </Route>
            </Route>

            <Route path={"training-request"}>
                <Route path={"open"}>
                    <Route path={""} element={<OpenTrainingRequestList />} />
                    <Route path={":uuid"} element={<OpenTrainingRequestView />} />
                </Route>
            </Route>

            <Route path={"course"}>
                <Route path={""} element={<CourseListView />} />
                <Route path={"create"} element={<CourseCreateView />} />
                <Route path={":uuid"} element={<CourseViewView />} />
            </Route>

            <Route path={"mentor-group"}>
                <Route path={""} element={<MentorGroupListView />} />
                <Route path={"create"} element={<MentorGroupCreateView />} />
                <Route path={":id"} element={<MentorGroupViewView />} />
            </Route>

            <Route path={"training-type"}>
                <Route path={""} element={<TrainingTypeListView />} />
                <Route path={"create"} element={<TrainingTypeCreateView />} />
                <Route path={":id"} element={<TrainingTypeViewView />} />
            </Route>

            <Route path={"log-template"}>
                <Route path={""} element={<> </>} />
                <Route path={"create"} element={<LogTemplateCreateView />} />
            </Route>

            <Route path={"syslog"}>
                <Route path={""} element={<SyslogListView />} />
                <Route path={":id"} element={<SyslogViewView />} />
            </Route>

            <Route path={"permission"}>
                <Route path={""} element={<PermissionListView />} />
                <Route path={"roles/:role_id"} element={<RoleViewView />} />
            </Route>

            <Route path={"403"} element={<Error403 />} />
            <Route path={"*"} element={<Error404 path={location.pathname} />} />
        </Routes>
    );
}
