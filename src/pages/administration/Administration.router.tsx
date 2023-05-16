import {Route, Routes, useLocation} from "react-router-dom";
import {UserListView} from "./mentor/users/user-search/UserList.view";
import {UserViewView} from "./mentor/users/user-view/UserView.view";
import {RequestFastTrackView} from "./mentor/users/user-view/_subpages/RequestFastTrack.subpage";
import {CourseListView} from "./lm/course/course-list/CourseList.view";
import {CourseCreateView} from "./lm/course/course-create/CourseCreate.view";
import {CourseViewView} from "./lm/course/course-view/CourseView.view";
import {TrainingTypeListView} from "./lm/training-type/training-type-list/TrainingTypeList.view";
import {TrainingTypeCreateView} from "./lm/training-type/training-type-create/TrainingTypeCreate.view";
import {SyslogListView} from "./tech/syslog/syslog-list/SyslogList.view";
import {PermissionListView} from "./tech/permission/permission-list/PermissionList.view";
import {Error403} from "../errors/403";
import {Error404} from "../errors/404";
import {RoleViewView} from "./tech/permission/role-view/RoleView.view";
import {LogTemplateCreateView} from "./lm/log-template/log-template-create/LogTemplateCreate.view";
import {MentorGroupCreateView} from "./lm/mentor-group/mentor-group-create/MentorGroupCreate.view";
import {MentorGroupListView} from "./lm/mentor-group/mentor-group-list/MentorGroupList.view";
import {SyslogViewView} from "./tech/syslog/syslog-view/SyslogView.view";
import {TrainingTypeViewView} from "./lm/training-type/training-type-view/TrainingTypeView.view";
import {MentorGroupViewView} from "./lm/mentor-group/mentor-group-view/MentorGroupView.view";
import {OpenRequestListView} from "./mentor/request/open-request-list/OpenRequestList.view";
import {ViewUserNotesView} from "./mentor/users/user-view/_subpages/ViewUserNotes.subpage";
import {OpenRequestViewView} from "./mentor/request/open-request-view/OpenRequestView.view";

export function AdministrationRouter() {
    const location = useLocation();

    return (
        <Routes>
            <Route path={"users"}>
                <Route path={"search"} element={<UserListView />} />

                <Route path={":user_id"}>
                    <Route path={""} element={<UserViewView />} />
                    <Route path={"f"} element={<RequestFastTrackView />} />
                    <Route path={"n"} element={<ViewUserNotesView />} />
                </Route>
            </Route>

            <Route path={"training-request"}>
                <Route path={"open"}>
                    <Route path={""} element={<OpenRequestListView/>} />
                    <Route path={":uuid"} element={<OpenRequestViewView/>} />
                </Route>
                <Route path={"planned"} element={<></>} />
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
